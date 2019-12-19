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

val dockerImageRef = "$buildDir/.docker/buildImage-imageId.txt"
val dockerContainerName = project.property("docker.app.container.name")?.toString() ?: "cogboard"
val dockerImageName = project.property("docker.app.image.name")?.toString() ?: "cogboard/cogboard-app"
val mountDir = "${rootProject.projectDir.absolutePath.replace("\\", "/")}/mnt"
val cypressContentPath = "${rootProject.projectDir.absolutePath.replace("\\", "/")}/cogboard-app/src/main/resources/cypressData/config.json"
val defaultCypressTestsDir = "${rootProject.projectDir.absolutePath.replace("\\", "/")}/functional/cypress-tests"
val functionalTestsPath = System.getProperty("functionalTestPath")?:defaultCypressTestsDir
val cypressEnvCode = System.getProperty("cypressEnv")?:"local"
val cypressConfigPath = "cypress/config/" + cypressEnvCode + ".json"
val network = "${project.name}-local_cognet"
val wsPort = project.property("ws.port")
val appPort = project.property("app.port")

logger.lifecycle(">> dockerContainerName: $dockerContainerName")
logger.lifecycle(">> dockerImageName: $dockerImageName")
logger.lifecycle(">> mountDir: $mountDir")
logger.lifecycle(">> functionalTestsPath: $functionalTestsPath")


task("cogboard-is-running") {
    dependsOn("build")
    doLast {
        logger.lifecycle("Running docker image")
        exec {
            commandLine(
                    "docker", "run", "--rm",
                    "-p$appPort:8092", // main app port
                    "-p1$appPort:18092", // remote debug port
                    "-p$wsPort:$wsPort", // web socket port
                    "--name", dockerContainerName,
                    "-v", "$mountDir:/data", // docker volume
                    dockerImageName
            )
        }
    }
}

tasks.register<DockerRemoveImage>("removeImage") {
    group = "docker"

    onlyIf { File(dockerImageRef).exists() }

    targetImageId(if (File(dockerImageRef).exists()) File(dockerImageRef).readText() else "")
    onError {
        if (!this.message!!.contains("No such image"))
            throw this
    }
}

tasks.register<DockerBuildImage> ("buildImage") {
    group = "docker"
    inputDir.set(file("$buildDir"))
    tags.add("$dockerImageName:$version")
    dependsOn("prepareDocker", "build")
}

tasks.register<Exec>("updateLocal") {
    group = "docker"
    commandLine = listOf("docker", "service", "update", "--force", "${project.name}-local_cogboard")
}

tasks.register<Exec>("updateMocks") {
    group = "docker"
    commandLine = listOf("docker", "service", "update", "--force", "${project.name}-local_api-mocks")
}

tasks.register<Exec>("initSwarm") {
    group = "swarm"
    commandLine = listOf("docker", "swarm", "init")
    isIgnoreExitValue = true
}

tasks.register<Exec>("awaitLocalStackUndeployed") {
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

tasks.register<Exec>("deployLocal") {
    environment = mapOf("COGBOARD_VERSION" to version)
    group = "swarm"
    commandLine = listOf("docker", "stack", "deploy", "-c", "${project.name}-local-compose.yml", "${project.name}-local")
    dependsOn("initSwarm", "buildImage", "awaitLocalStackUndeployed")
    mustRunAfter("undeployLocal")
}

tasks.register<Exec>("undeployLocal") {
    group = "swarm"
    commandLine = listOf("docker", "stack", "rm", "${project.name}-local")
    dependsOn("initSwarm")
}

tasks.register("redeployLocal") {
    group = "swarm"
    dependsOn("undeployLocal", "deployLocal")
}

tasks.register<Exec>("functionalTests") {
    group = "docker-functional-tests"
    commandLine = listOf("docker", "run", "-v","$functionalTestsPath:/e2e","-w","/e2e","--network=$network", "cypress/included:3.8.0", "--browser", "chrome", "--config-file", "$cypressConfigPath")

    dependsOn("redeployLocal", "copyCypressContent" )
    doFirst {
        logger.lifecycle("Running functional tests from $functionalTestsPath with base network: $network")
    }
}

tasks.register<Exec>("copyCypressContent") {
    group = "docker-functional-tests"
    commandLine = listOf("sh", "scripts/copyCypressContent.sh", "$cypressContentPath", "$mountDir")
    mustRunAfter("redeployLocal")
}
