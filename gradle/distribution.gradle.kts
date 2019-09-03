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
val wsConfigFiles = listOf("openapi.yaml", "websockets.conf")
tasks.register<Copy>("copyModulesWithDeps") {
    group = "distribution"

    from(configurations.named("dist"))
    into("$buildDir/knotx/lib")

    mustRunAfter("cleanDistribution")
}

tasks.register<Copy>("copyConfigs") {
    group = "distribution"

    from("knotx/conf")
    into("$buildDir/knotx/conf")
    exclude(wsConfigFiles)

    mustRunAfter("cleanDistribution")
}


tasks.register<Copy>("copyWsConf") {
    group = "distribution"

    from("knotx/conf")
    include(wsConfigFiles)
    into("$buildDir/knotx/conf")
    expand("ws_port" to project.property("ws.port"))

    mustRunAfter("cleanDistribution")
}

tasks.register<Copy>("copyBin") {
    group = "distribution"

    from("knotx/bin")
    into("$buildDir/knotx/bin")

    mustRunAfter("cleanDistribution")
}

tasks.register<Copy>("copyDockerfile") {
    group = "distribution"

    from("docker")
    into("$buildDir")
    expand("knotx_version" to project.property("knotx.version"))

    mustRunAfter("cleanDistribution")
}

tasks.register<Delete>("cleanDistribution") {
    group = "distribution"

    delete(fileTree("$buildDir").matching {
        include("knotx/**")
    })
}

tasks.register("prepareDocker") {
    dependsOn("cleanDistribution", "copyModulesWithDeps", "copyBin", "copyConfigs", "copyDockerfile", "copyWsConf")
}