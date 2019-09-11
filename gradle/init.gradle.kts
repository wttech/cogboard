val initEndpoints = !File("$projectDir/mnt/endpoints.conf").exists()
val initAdmins = !File("$projectDir/knotx/conf/admins.conf").exists()
val initJwt = !File("$projectDir/knotx/conf/jwt.conf").exists()
val initConfig = !File("$projectDir/mnt/config.json").exists()

tasks {
    register<Copy>("cogboardCopyEndpoints") {
        group = "distribution"

        if (initEndpoints) {
            logger.lifecycle(">> creating './mnt/endpoints.conf' file")
            from("$projectDir/knotx/conf/initial/endpoints.conf")
              into("$projectDir/mnt")
        }
    }

    register<Copy>("cogboardCopyAdmins") {
        group = "distribution"

        if (initAdmins) {
            logger.lifecycle(">> creating './knotx/conf/admins.conf' file")
            from("$projectDir/knotx/conf/initial/admins.conf")
            into("$projectDir/knotx/conf")
        }
    }

    register<Copy>("cogboardCopyJwt") {
        group = "distribution"

        if (initJwt) {
            logger.lifecycle(">> creating './knotx/conf/jwt.conf' file")
            from("$projectDir/knotx/conf/initial/jwt.conf")
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

    register("cogboardInit") {
        dependsOn("cogboardCopyEndpoints", "cogboardCopyAdmins", "cogboardCopyJwt", "cogboardCopyConfig")
    }
}