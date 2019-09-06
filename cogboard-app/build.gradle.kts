import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm")
}

sourceSets["test"].java.srcDir("src/test/kotlin")

tasks.named("processResources") {
    dependsOn(":cogboard-webapp:copyReactAppToAppClasspath")
}

dependencies {

    "io.knotx:knotx".let { v ->
        implementation(platform("$v-dependencies:${project.property("knotx.version")}"))
        implementation("$v-server-http-api:${project.property("knotx.version")}")
    }
    "io.vertx:vertx".let { v ->
        implementation("$v-web")
        implementation("$v-auth-jwt")
        implementation("$v-web-client")
        implementation("$v-rx-java2")
    }
    implementation(kotlin("stdlib-jdk8"))

    testImplementation(
            "org.assertj:assertj-core:3.12.2",
            "org.junit.jupiter:junit-jupiter-api:5.4.2"
    )
    testRuntime("org.junit.jupiter:junit-jupiter-engine:5.4.2")
}

repositories {
    mavenCentral()
}

val compileKotlin: KotlinCompile by tasks
compileKotlin.kotlinOptions {
    jvmTarget = "1.8"
}
val compileTestKotlin: KotlinCompile by tasks
compileTestKotlin.kotlinOptions {
    jvmTarget = "1.8"
}