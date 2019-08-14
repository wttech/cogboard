val initEndpoints = !File("$projectDir/knotx/conf/endpoints.conf").exists()
val initConfig = !File("$projectDir/mnt/config.json").exists()

tasks {
    register<Copy>("cogboardCopyEndpoints") {
        group = "distribution"

        if (initEndpoints) {
            logger.lifecycle(">> creating './knotx/conf/endpoints.conf' file")
            from("$projectDir/knotx/conf/initial/endpoints.conf")
            into("$projectDir/knotx/conf")
        }
    }

    register<Copy>("cogboardCopyConfig") {
        group = "distribution"

        if (initConfig) {
            logger.lifecycle(">> creating './mnt/config.json' file")
            from("$projectDir/knotx/conf/initial/config.json")
            into("$projectDir/mnt")
        }
    }

    register("cogboardInitConfigs") {
        dependsOn("cogboardCopyEndpoints", "cogboardCopyConfig")
    }
}