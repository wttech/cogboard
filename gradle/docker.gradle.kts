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
import com.bmuschko.gradle.docker.tasks.container.DockerCreateContainer
import com.bmuschko.gradle.docker.tasks.container.DockerStartContainer
import com.bmuschko.gradle.docker.tasks.container.DockerStopContainer
import com.bmuschko.gradle.docker.tasks.container.extras.DockerWaitHealthyContainer
import com.bmuschko.gradle.docker.tasks.image.DockerBuildImage
import com.bmuschko.gradle.docker.tasks.image.DockerRemoveImage

val dockerImageRef = "$buildDir/.docker/buildImage-imageId.txt"
val dockerContainerName = project.property("docker.container.name")?.toString() ?: "cogboard"
val dockerImageName = project.property("docker.image.name")?.toString() ?: "cogboard/cogboard-app"
val mountDir = "${rootProject.projectDir.absolutePath.replace("\\", "/")}/mnt"
val wsPort = project.property("ws.port")
val appPort = project.property("app.port")

logger.lifecycle(">> dockerContainerName: $dockerContainerName")
logger.lifecycle(">> dockerImageName: $dockerImageName")
logger.lifecycle(">> mountDir: $mountDir")


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

task("dockerStopCogboard") {
    doLast {
        logger.lifecycle("Trying to stop docker container named: $dockerContainerName")
        exec {
            isIgnoreExitValue = true
            commandLine("docker", "container", "stop", dockerContainerName)
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
    tags.add("${project.property("docker.image.name")}:latest")
    dependsOn("removeImage", "prepareDocker")
}
val buildImage = tasks.named<DockerBuildImage>("buildImage")

// FUNCTIONAL TESTS

tasks.register<DockerCreateContainer>("createContainer") {
    group = "docker-functional-tests"
    dependsOn(buildImage)
    targetImageId(buildImage.get().imageId)
    portBindings.set(listOf("8092:8092"))
    exposePorts("tcp", listOf(8092))
    autoRemove.set(true)
}
val createContainer = tasks.named<DockerCreateContainer>("createContainer")

tasks.register<DockerStartContainer>("startContainer") {
    group = "docker-functional-tests"
    dependsOn(createContainer)
    targetContainerId(createContainer.get().containerId)
}

tasks.register<DockerWaitHealthyContainer>("waitContainer") {
    group = "docker-functional-tests"
    dependsOn(tasks.named("startContainer"))
    targetContainerId(createContainer.get().containerId)
}

tasks.register<DockerStopContainer>("stopContainer") {
    group = "docker-functional-tests"
    targetContainerId(createContainer.get().containerId)
}

/** Deprecated */
tasks.register("runTest", Test::class) {
    dependsOn(tasks.named("runFunctionalTest"))
}

tasks.register("runFunctionalTest", Test::class) {
    group = "docker-functional-tests"
    dependsOn(tasks.named("waitContainer"))
    finalizedBy(tasks.named("stopContainer"))
    include("**/*ITCase*")
}
