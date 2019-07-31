plugins {
    `java-library`
}

dependencies {
    implementation(platform("io.knotx:knotx-dependencies:${project.property("knotx.version")}"))
    "io.knotx:knotx".let { v ->
        implementation("$v-fragments-handler-api:${project.property("knotx.version")}")
    }
    "io.vertx:vertx".let { v ->
        implementation("$v-core")
        implementation("$v-rx-java2")
        implementation("$v-health-check")
    }

}
