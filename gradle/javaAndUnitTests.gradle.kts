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
import org.gradle.api.tasks.testing.logging.TestExceptionFormat
import org.gradle.api.tasks.testing.logging.TestLogEvent

allprojects {
    plugins.withId("java") {
        tasks.withType<JavaCompile>().configureEach {
            with(options) {
                sourceCompatibility = "1.8"
                targetCompatibility = "1.8"
                compilerArgs = listOf("-parameters")
                encoding = "UTF-8"
            }
        }

        tasks.withType<Test>().configureEach {
            systemProperties(Pair("vertx.logger-delegate-factory-class-name", "io.vertx.core.logging.SLF4JLogDelegateFactory"))

            failFast = true
            useJUnitPlatform()
            testLogging {
                events = setOf(TestLogEvent.FAILED)
                exceptionFormat = TestExceptionFormat.SHORT
            }

            dependencies {
                "testImplementation"(platform("io.knotx:knotx-dependencies:${project.property("knotx.version")}"))
                "testImplementation"("org.junit.jupiter:junit-jupiter-api")
                "testRuntimeOnly"("org.junit.jupiter:junit-jupiter-engine")
                "testImplementation"(group = "io.rest-assured", name = "rest-assured", version = "3.3.0")
            }
        }

        tasks.withType<Test>().configureEach {
            include("**/*Test*")
        }
    }
}