#!/bin/bash

APP_PORT=8092
WS_PORT=9001
DEBUG_PORT=18092
CONFIG_DIR=$(pwd)/mnt
DOCKER_TAG=${1:-$VERSION}
IMAGE_NAME="cogboard/cogboard-app"
CONTAINER_NAME="cogboard"

# Stop and remove currently running Cogboard container
docker rm -f cogboard

# Remove orphaned images
docker image prune -f

# Run
docker run -d -p ${APP_PORT}:${APP_PORT} -p ${WS_PORT}:${WS_PORT} -p ${DEBUG_PORT}:${DEBUG_PORT} -v ${CONFIG_DIR}:/data --name ${CONTAINER_NAME} ${IMAGE_NAME}:${DOCKER_TAG}