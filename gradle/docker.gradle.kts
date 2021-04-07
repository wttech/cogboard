/*
 * Copyright (C) 2019 CogBoard Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import com.bmuschko.gradle.docker.tasks.image.DockerBuildImage
import com.bmuschko.gradle.docker.tasks.image.DockerRemoveImage

val projectDir = rootProject.projectDir.absolutePath.replace("\\", "/")
val dockerImageRef = "$buildDir/.docker/buildImage-imageId.txt"
val dockerContainerName = project.property("docker.app.container.name")?.toString() ?: "cogboard"
val dockerImageName = project.property("docker.app.image.name")?.toString() ?: "cogboard/cogboard-app"
val mountDir = "$projectDir/mnt"
val cypressContentPath = "$projectDir/cogboard-app/src/main/resources/cypressData/config.json"
val defaultCypressTestsDir = "$projectDir/functional/cypress-tests"
val functionalTestsPath = System.getProperty("functionalTestPath") ?: defaultCypressTestsDir
val cypressEnvCode = System.getProperty("cypressEnv") ?: "local"
val cypressConfigPath = "cypress/config/$cypressEnvCode.json"
val network = "${project.name}-local_cognet"
val wsPort = project.property("ws.port")
val appPort = project.property("app.port")

logger.lifecycle(">> dockerContainerName: $dockerContainerName")
logger.lifecycle(">> dockerImageName: $dockerImageName")
logger.lifecycle(">> mountDir: $mountDir")
logger.lifecycle(">> functionalTestsPath: $functionalTestsPath")
logger.lifecycle(">> cypressConfigPath: $cypressConfigPath")

tasks {

    register<DockerRemoveImage>("removeImage") {
        group = "docker"

        onlyIf { File(dockerImageRef).exists() }

        targetImageId(if (File(dockerImageRef).exists()) File(dockerImageRef).readText() else "")
        onError {
            if (!this.message!!.contains("No such image"))
                throw this
        }
    }

    register<DockerBuildImage>("buildImage") {
        group = "docker"

        inputDir.set(file("$buildDir"))
        images.add("$dockerImageName:$version")
        dependsOn("prepareDocker", "build")
    }

    register<Exec>("updateLocal") {
        group = "docker"
        commandLine = listOf("docker", "service", "update", "--force", "${project.name}-local_cogboard")
    }

    register<Exec>("updateMocks") {
        group = "docker"
        commandLine = listOf("docker", "service", "update", "--force", "${project.name}-local_api-mocks")
    }

    register<Exec>("initSwarm") {
        group = "swarm"
        commandLine = listOf("docker", "swarm", "init")
        isIgnoreExitValue = true
    }

    register<Exec>("awaitLocalStackUndeployed") {
        commandLine = listOf("docker", "network", "inspect", network)
        isIgnoreExitValue = true
        errorOutput = java.io.ByteArrayOutputStream()
        doLast {
            if (errorOutput.toString().contains("Error: No such network")) {
                //we are happy, since this network is down we can proceed
            } else {
                Thread.sleep(15 * 1000) // let's wait for better times
            }
        }
        mustRunAfter("build")
    }

    register<Exec>("deployLocal") {
        environment = mapOf("COGBOARD_VERSION" to version)
        group = "swarm"
        commandLine = listOf("docker", "stack", "deploy", "-c", "${project.name}-local-compose.yml", "${project.name}-local")
        dependsOn("initSwarm", "buildImage", "awaitLocalStackUndeployed")
        mustRunAfter("undeployLocal")
    }

    register<Exec>("undeployLocal") {
        group = "swarm"
        commandLine = listOf("docker", "stack", "rm", "${project.name}-local")
        dependsOn("initSwarm")
    }

    register("redeployLocal") {
        group = "swarm"
        dependsOn("undeployLocal", "deployLocal")
    }

    register<Exec>("functionalTests") {
        group = "Docker Functional Tests"
        commandLine = listOf(
                "docker", "run",
                "-v", "$functionalTestsPath:/e2e",
                "-w", "/e2e",
                "--network=$network",
                "cypress/included:7.0.0",
                "--browser", "chrome",
                "--config-file", cypressConfigPath
        )

        dependsOn("redeployLocal", "copyCypressContent")
        doFirst {
            logger.lifecycle("Running functional tests from $functionalTestsPath with base network: $network")
        }
    }

    register<Copy>("copyCypressContent") {
        group = "Docker Functional Tests"

        from(cypressContentPath)
        into(mountDir)
        doLast {
            logger.lifecycle(">> Automated testing data has been successfully copied")
        }
        mustRunAfter("redeployLocal")
    }

    // DIST
    register<Copy>("copyDockerfile") {
        group = "distribution"

        from("docker")
        into(buildDir)
        include("Dockerfile")
        expand("knotx_version" to project.property("knotx.version"))
        mustRunAfter("copyConfigs")
    }

    register<Copy>("copyWsConf") {
        group = "distribution"

        from("knotx/conf")
        into("$buildDir/out/knotx/conf")
        include("openapi.yaml", "cogboard.conf")
        expand("ws_port" to project.property("ws.port"))
        mustRunAfter("copyConfigs")
    }

    register("prepareDocker") {
        dependsOn("cleanDistribution", "overwriteCustomFiles", "copyDockerfile", "copyWsConf")
    }
}
