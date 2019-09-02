import com.moowork.gradle.node.NodeExtension
import com.moowork.gradle.node.npm.NpmTask

plugins {
    id("base")
    id("com.moowork.node")
}

configure<NodeExtension> {
    version = "10.16.0"
    download = true
}

tasks {
    named("npmInstall"){
        dependsOn("copyEnvFile")
    }

    register<NpmTask>("buildReactApp") {
        dependsOn("npmInstall")
        setArgs(listOf("run", "build"))
    }
    register<Copy>("copyReactAppToAppClasspath") {
        dependsOn("buildReactApp")
        from("$buildDir")
        into("${rootProject.rootDir}/cogboard-app/src/main/resources")
    }
    register<Copy>("copyEnvFile"){
        dependsOn("clearEnvFile")
        from("${project.projectDir}/config")
        into("${project.projectDir}")

        expand("ws_port" to rootProject.property("ws.port"))
    }

    register<Delete>("clearEnvFile"){
        delete("${project.projectDir}/.env")
    }
}

