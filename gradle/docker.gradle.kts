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

buildscript {
    repositories {
        gradlePluginPortal()
    }
    dependencies {
        classpath("com.bmuschko:gradle-docker-plugin:4.9.0")
    }
}

val dockerImageRef = File("$buildDir/.docker/buildImage-imageId.txt")
val dockerContainerName = project.property("docker.container.name")?.toString() ?: "cogboard"
val dockerImageName = project.property("docker.image.name")?.toString() ?: "cogboard/cogboard-app"
val mountDir = "${rootProject.projectDir.absolutePath.replace("\\", "/")}/mnt"
val wsPort = project.property("ws.port")
val appPort = project.property("app.port")

logger.lifecycle(">> dockerContainerName: $dockerContainerName")
logger.lifecycle(">> dockerImageName: $dockerImageName")
logger.lifecycle(">> mountDir: $mountDir")


task("docker-run") {
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

tasks.create("removeImage", DockerRemoveImage::class) {
    group = "docker"

    val spec = Spec<Task> { dockerImageRef.exists() }
    onlyIf(spec)

    targetImageId(if (dockerImageRef.exists()) dockerImageRef.readText() else "")
    onError {
        if (!this.message!!.contains("No such image"))
            throw this
    }
}

val buildImage by tasks.creating(DockerBuildImage::class) {
    group = "docker"
    inputDir.set(file("$buildDir"))
    tags.add("$dockerImageName:latest")
    dependsOn("removeImage", "prepareDocker")
}

// FUNCTIONAL TESTS

val createContainer by tasks.creating(DockerCreateContainer::class) {
    group = "docker-functional-tests"
    dependsOn(buildImage)
    targetImageId(buildImage.getImageId())
    portBindings.set(listOf("8092:8092"))
    exposePorts("tcp", listOf(8092))
    autoRemove.set(true)
    containerName.set(dockerContainerName)
}

val startContainer by tasks.creating(DockerStartContainer::class) {
    group = "docker-functional-tests"
    dependsOn(createContainer)
    targetContainerId(createContainer.containerId)
}

val waitContainer by tasks.creating(DockerWaitHealthyContainer::class) {
    group = "docker-functional-tests"
    dependsOn(startContainer)
    targetContainerId(createContainer.containerId)
}

val stopContainer by tasks.creating(DockerStopContainer::class) {
    group = "docker-functional-tests"
    targetContainerId(createContainer.containerId)
}

tasks.create("runTest", Test::class) {
    group = "docker-functional-tests"
    dependsOn(waitContainer)
    finalizedBy(stopContainer)

    include("**/*ITCase*")
}