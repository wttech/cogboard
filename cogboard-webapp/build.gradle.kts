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
    register<NpmTask>("buildReactApp") {
        dependsOn("npmInstall")
        setArgs(listOf("run", "build"))
    }
    register<Copy>("copyReactAppToAppClasspath") {
        dependsOn("buildReactApp")
        from("$buildDir")
        into("${rootProject.rootDir}/cogboard-app/src/main/resources")
    }
}


