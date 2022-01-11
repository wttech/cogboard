import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm")
}

tasks.named<Test>("test") {
    useJUnitPlatform()
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
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.10.0")
    implementation(kotlin("stdlib-jdk8"))
    implementation("com.jcraft:jsch:0.1.55")
    implementation("org.mongodb:mongo-java-driver:3.12.10")

    testImplementation("org.assertj:assertj-core:3.12.2")
    testImplementation("org.junit.jupiter:junit-jupiter-api:5.4.2")
    testImplementation("org.junit.jupiter:junit-jupiter-params:5.3.1")
    testImplementation("org.mockito:mockito-junit-jupiter:3.1.0")
    testImplementation(gradleTestKit())
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