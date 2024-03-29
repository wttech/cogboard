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

import org.apache.tools.ant.taskdefs.condition.Os

plugins {
    id("java-library")
    id("com.bmuschko.docker-remote-api")
    id("io.gitlab.arturbosch.detekt") version "1.16.0"
    id("io.knotx.distribution")
}

val dockerContainerName = project.property("docker.app.container.name") ?: "cogboard"
val dockerImageName = project.property("docker.app.image.name") ?: "cogboard/cogboard-app"

defaultTasks("redeployLocal")

dependencies {
    subprojects.forEach { "dist"(project(":${it.name}")) }
    "detektPlugins"("io.gitlab.arturbosch.detekt:detekt-formatting:1.16.0")
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(8))
    }
}

allprojects {
    group = "com.cognifide"

    repositories {
        jcenter()
        mavenLocal()
        maven {
            url = uri("https://plugins.gradle.org/m2/")
            url = uri("https://oss.sonatype.org/content/groups/staging/")
            url = uri("https://oss.sonatype.org/content/repositories/snapshots")
        }
    }
}

tasks {
    named("build") {
        dependsOn(":cogboard-app:test", ":cogboard-webapp:buildImage")
    }
    register("cypressInit", Exec::class) {
        setWorkingDir("./functional/cypress-tests")
        commandLine("npm${getCMD()}", "install")
    }
    register("cypressOpen", Exec::class) {
        setWorkingDir("./functional/cypress-tests")
        commandLine("npx${getCMD()}", "cypress", "open")
        dependsOn("cypressInit")
    }
}

detekt {
    input = files("cogboard-app/src/main/kotlin")
    config.from(file("detekt.yml"))
    parallel = true
    autoCorrect = true
}

apply(from = "gradle/javaAndUnitTests.gradle.kts")
apply(from = "gradle/docker.gradle.kts")
apply(from = "gradle/prepareCogboardCompose.gradle.kts")

// Uncomment lines below so you can print tasks execution order easily
//gradle.taskGraph.whenReady {
//    this.allTasks.forEach { logger.error(it.path + " " + it.name) }
//}

fun getCMD() = if (Os.isFamily(Os.FAMILY_WINDOWS)) ".cmd" else ""