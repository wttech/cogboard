#!/bin/bash

DOCKER_IMAGE="cogboard/cogboard-app"

# get current version from gradle.version file
export VERSION=$(sed -n '1s/^.*[^0-9]\([0-9]*\.[0-9]*\.[0-9]*\).*$/\1/p' gradle.properties)

# login to docker hub
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

# push recently builded image
docker push ${DOCKER_IMAGE}:${VERSION}-SNAPSHOT