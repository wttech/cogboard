tasks {
    register("prepareMongoConfig") {
        createMongoConfigFile()
    }
}

fun createMongoConfigFile() {
    val configFilePath = "$rootDir/mnt/init-mongo.js"
    logger.lifecycle(">> createZip >> Creating $configFilePath")

    val user = project.property("mongo.user")
    val password = project.property("mongo.password")
    File(configFilePath).writeText("""
        db.createUser(
        {
            user    : "$user",
            pwd     : "$password",
            roles   : [
                {
                    role: "root",
                    db  : "logs"
                }
            ]
        }
        )
    """.trimIndent())
}