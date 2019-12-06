#!/bin/bash

DOCKER_IMAGE="cogboard/cogboard-app"

# login to docker hub
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

# Tag and push recently builded image
echo $VERSION
echo "Tag RELEASE build" && docker tag ${DOCKER_IMAGE}:${VERSION} ${DOCKER_IMAGE}:latest
echo "Push RELEASE image" && docker push ${DOCKER_IMAGE}