val initEndpoints = !File("$projectDir/knotx/conf/endpoints.conf").exists()
val initAdmins = !File("$projectDir/knotx/conf/admins.conf").exists()
val initJwt = !File("$projectDir/knotx/conf/jwt.conf").exists()
val initConfig = !File("$projectDir/mnt/config.json").exists()

val configFilesPaths = mapOf("endpoints.conf" to "$projectDir/knotx/conf/",
        "admins.conf" to "$projectDir/knotx/conf/",
        "jwt.conf" to "$projectDir/knotx/conf/",
        "config.json" to "$projectDir/mnt/")

tasks {
    register<Copy>("cogboardCopyEndpoints") {
        group = "distribution"

        if (initEndpoints) {
            logger.lifecycle(">> creating './knotx/conf/endpoints.conf' file")
            from("$projectDir/knotx/conf/initial/endpoints.conf")
            into("$projectDir/knotx/conf")
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

    register("checkInited") {
        doLast {
            configFilesPaths.forEach { (fileName, to) ->
                if(!File(to + fileName).exists()) {
                    logger.error("Cannot find file: $fileName. Please execute task cogboardInit first")
                    throw GradleException("Cannot find file: $fileName in $to directory.")
                }
            }
        }
    }
}