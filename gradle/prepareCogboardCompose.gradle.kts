tasks {
    register("prepareCogboardCompose") {
        createComposeFile()
    }
}

fun createComposeFile() {
    val currentVersion = rootProject.version.toString()
    val composeFilePath = "$rootDir/cogboard-compose.yml"
    logger.lifecycle(">> createZip >> Creating $composeFilePath")

    val user = project.property("mongo.user") ?: "root"
    val password = project.property("mongo.password") ?: "root"
    File(composeFilePath).writeText("""version: "3.7"

services:
  backend:
    image: "cogboard/cogboard-app:$currentVersion"
    environment:
      - COGBOARD_VERSION=$currentVersion
      - MONGO_USERNAME=$user
      - MONGO_PASSWORD=$password
    volumes:
      - "./mnt:/data"
  
  mongo:
    image: mongo
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: "$user"
      MONGO_INITDB_ROOT_PASSWORD: "$password"
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
