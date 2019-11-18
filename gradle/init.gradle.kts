val configsToCopy = mapOf(
        "config.json" to "/mnt",
        "credentials.json" to "/mnt",
        "endpoints.json" to "/mnt",
        "admins.conf" to "/mnt",
        "widget1.json" to "/mnt/content",
        "jwt.conf" to "/knotx/conf"
)

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
        configsToCopy.forEach { (fileName, to) ->
            if(!File("$projectDir$to/$fileName").exists()) {
                val errorMessage = "Cannot find file: $fileName in $to directory. " +
                        "Please check your config, or execute task cogboardInit."
                logger.error(errorMessage)
                throw GradleException(errorMessage)
            }
        }
    }
}