import com.bmuschko.gradle.docker.tasks.image.DockerBuildImage
import com.moowork.gradle.node.NodeExtension
import com.moowork.gradle.node.npm.NpmTask

plugins {
    id("base")
    id("com.moowork.node")
    id("com.bmuschko.docker-remote-api")
}

configure<NodeExtension> {
    version = "10.16.0"
    download = true
}

val reactAppDestPath = "${rootProject.rootDir}/cogboard-app/src/main/resources"
tasks {
    named("npmInstall"){
        dependsOn("copyEnvFile")
    }

    register<NpmTask>("buildReactApp") {
        dependsOn("npmInstall")
        setArgs(listOf("run", "build"))

        inputs.file("package.json")
        inputs.dir("src")
        inputs.dir("public")
        outputs.dir(buildDir)
    }
    register<Copy>("copyReactAppToAppClasspath") {
        dependsOn("buildReactApp")
        from("$buildDir")
        into(reactAppDestPath)

        inputs.dir(buildDir)
        outputs.dir(reactAppDestPath)
    }
    register<Copy>("copyEnvFile"){
        dependsOn("clearEnvFile")
        from("${project.projectDir}/config")
        into("${project.projectDir}")

        expand(
            "ws_port" to rootProject.property("ws.port"),
            "app_port" to rootProject.property("app.port")
        )

        inputs.dir("${project.projectDir}/config")
        outputs.dir("${project.projectDir}")
    }
    register<DockerBuildImage> ("buildImage") {
        group = "docker"
        inputDir.set(file("$projectDir"))
        tags.add("${rootProject.property("docker.web.image.name")}:$version")
        dependsOn("buildReactApp")
    }
    register<Delete>("clearEnvFile"){
        delete("${project.projectDir}/.env")
    }
}

