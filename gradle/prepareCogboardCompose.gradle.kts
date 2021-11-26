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
    environment:
      - COGBOARD_VERSION=$currentVersion
    volumes:
      - "./mnt:/data"
  
  mongo:
    image: mongo
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: "root"
      MONGO_INITDB_ROOT_PASSWORD: "root"
      MONGO_INITDB_DATABASE: "logs"
    volumes:
      - "./mnt/mongo:/data/db"

  frontend:
    image: "cogboard/cogboard-web:$currentVersion"
    depends_on:
      - "backend"
    ports:
      - "80:80"
""")
}
