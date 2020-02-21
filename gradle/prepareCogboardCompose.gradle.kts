tasks {
    register("prepareCogboardCompose") {
        createComposeFile()
    }
}

fun createComposeFile() {
    val currentVersion = rootProject.version.toString()
    val composeFilePath = "$rootDir/cogboard-compose.yml"
    logger.lifecycle(">> createZip >> Creating $composeFilePath")

    File(composeFilePath).writeText("""version: "3.7"

services:
  backend:
    image: "cogboard/cogboard-app:$currentVersion"
    volumes:
      - "./mnt:/data"

  frontend:
    image: "cogboard/cogboard-web:$currentVersion"
    depends_on:
      - "backend"
    ports:
      - "80:80"
""")
}
