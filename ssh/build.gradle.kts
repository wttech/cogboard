import com.bmuschko.gradle.docker.tasks.image.DockerBuildImage

plugins {
    id("base")
    id("com.bmuschko.docker-remote-api")
}

tasks {
    register<DockerBuildImage>("buildImage") {
        group = "docker"
        inputDir.set(file(projectDir))
        images.add("ssh-server")
    }
}