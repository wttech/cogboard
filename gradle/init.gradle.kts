val configsToCopy = mapOf(
        "config.json" to "/mnt",
        "endpoints.json" to "/mnt",
        "admins.conf" to "/knotx/conf",
        "jwt.conf" to "/knotx/conf"
)

val configFilesPaths = mapOf("endpoints.conf" to "$projectDir/knotx/conf/",
        "admins.conf" to "$projectDir/knotx/conf/",
        "jwt.conf" to "$projectDir/knotx/conf/",
        "config.json" to "$projectDir/mnt/")

tasks {
    val registeredTasks = mutableSetOf<String>()

    configsToCopy.forEach { (fileName, to) ->
        val taskName = "cogboardInit-$fileName"
        val sourceFile = "$projectDir/knotx/conf/initial/$fileName"
        val destinationPath = "$projectDir$to"
        val fileNotExists = !File("$destinationPath/$fileName").exists()

        if (fileNotExists) {
            registeredTasks.add(taskName)

            register<Copy>(taskName) {
                group = "distribution"

                logger.lifecycle(">> creating $destinationPath/$fileName")
                from(sourceFile)
                into(destinationPath)
            }
        }
    }

    register("cogboardInit") {
        setDependsOn(registeredTasks)
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