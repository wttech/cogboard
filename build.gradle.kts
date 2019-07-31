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
plugins {
    id("com.bmuschko.docker-remote-api") version "4.9.0"
    id("java")
}

defaultTasks("docker-run")

configurations {
    register("dist")
}

dependencies {
    subprojects.forEach { "dist"(project(":${it.name}")) }
}

sourceSets.named("test") {
    java.srcDir("functional/src/test/java")
}

allprojects {
    group = "com.cognifide"

    repositories {
        jcenter()
        mavenLocal()
        maven { url = uri("https://plugins.gradle.org/m2/") }
        maven { url = uri("https://oss.sonatype.org/content/groups/staging/") }
        maven { url = uri("https://oss.sonatype.org/content/repositories/snapshots") }
    }
}

tasks.named("build") {
    dependsOn("runTest", "docker-clean")
}

task("docker-run") {
    dependsOn("build")
    doLast {
        logger.lifecycle("Running docker image")
        exec {
            commandLine("docker", "run", "--rm", "-p8092:8092", "-p18092:18092", "-p9000:9000", "--name", "cogboard", "cogboard/cogboard-app")
            // command: `docker run --rm -p8092:8092 -p18092:18092 -p9000:9000 --name cogboard cogboard/cogboard-app`
        }
    }
}

task("docker-clean") {
    doLast {
        logger.lifecycle("Cleaning docker image")
        exec {
            isIgnoreExitValue = true
            commandLine("docker", "container", "stop", "cogboard")
        }
    }
}

apply(from = "gradle/distribution.gradle.kts")
apply(from = "gradle/javaAndUnitTests.gradle.kts")
apply(from = "gradle/docker.gradle.kts")

//gradle.taskGraph.whenReady {
//    this.allTasks.forEach { logger.error(it.path + " " + it.name) }
//}