plugins {
    `kotlin-dsl`
}

repositories {
    mavenLocal()
    jcenter()
    gradlePluginPortal()
    maven {
        url = uri("https://plugins.gradle.org/m2")
        url = uri("http://dl.bintray.com/cognifide/maven-public")
        url = uri("https://dl.bintray.com/neva-dev/maven-public")
    }
}

dependencies {
    implementation("com.moowork.gradle:gradle-node-plugin:1.3.1")
    implementation("org.jetbrains.kotlin:kotlin-gradle-plugin:1.4.32")
    implementation("com.bmuschko:gradle-docker-plugin:6.7.0")
    implementation("io.knotx:knotx-gradle-plugins:0.1.4")
}
