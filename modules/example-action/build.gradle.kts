plugins {
    `java-library`
}

dependencies {

    "io.knotx:knotx".let { v ->
        implementation(platform("$v-dependencies:${project.property("knotx.version")}"))
        api("$v-fragments-api:${project.property("knotx.version")}")
        api("$v-fragments-handler-api:${project.property("knotx.version")}")
    }
    "io.vertx:vertx".let { v ->
        implementation("$v-web")
        implementation("$v-web-client")
        implementation("$v-rx-java2")
    }
}
