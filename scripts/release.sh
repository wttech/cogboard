#!/bin/bash

DOCKER_IMAGE="cogboard/cogboard-app"

# login to docker hub
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

# tag and push recently builded image
docker tag ${DOCKER_IMAGE}:latest ${DOCKER_IMAGE}:${VERSION}
docker push ${DOCKER_IMAGE}