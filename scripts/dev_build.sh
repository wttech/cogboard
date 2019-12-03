#!/bin/bash

DOCKER_IMAGE="cogboard/cogboard-app"

# login to docker hub
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

# Push recently builded image
echo "Tag DEV build" && docker tag ${DOCKER_IMAGE}:$VERSION-SNAPSHOT ${DOCKER_IMAGE}:SNAPSHOT
echo "Push DEV image" && docker push ${DOCKER_IMAGE}:SNAPSHOT