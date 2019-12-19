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
    id("com.bmuschko.docker-remote-api")
    id("java")
    id("io.gitlab.arturbosch.detekt") version "1.1.0"
    id("net.researchgate.release")
}

val dockerContainerName = project.property("docker.app.container.name") ?: "cogboard"
val dockerImageName = project.property("docker.app.image.name") ?: "cogboard/cogboard-app"

defaultTasks("redeployLocal")

configurations {
    register("dist")
}

dependencies {
    subprojects.forEach { "dist"(project(":${it.name}")) }
    "detektPlugins"("io.gitlab.arturbosch.detekt:detekt-formatting:1.1.0")
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
    dependsOn(":cogboard-app:test", ":cogboard-webapp:buildImage")
}

detekt {
    input = files("cogboard-app/src/main/kotlin")
    config.from(file("detekt.yml"))
    parallel = true
    autoCorrect = true
    failFast = true
}



apply(from = "gradle/distribution.gradle.kts")
apply(from = "gradle/javaAndUnitTests.gradle.kts")
apply(from = "gradle/docker.gradle.kts")
apply(from = "gradle/release.gradle")

//gradle.taskGraph.whenReady {
//    this.allTasks.forEach { logger.error(it.path + " " + it.name) }
//}