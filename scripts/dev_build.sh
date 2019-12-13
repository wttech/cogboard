#!/bin/bash

DOCKER_APP_IMAGE="cogboard/cogboard-app"
DOCKER_WEB_IMAGE="cogboard/cogboard-web"

# login to docker hub
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

# Push recently builded image
echo "Tag DEV build" && docker tag ${DOCKER_APP_IMAGE}:${VERSION}-SNAPSHOT ${DOCKER_APP_IMAGE}:SNAPSHOT
echo "Push DEV image" && docker push ${DOCKER_APP_IMAGE}:SNAPSHOT

echo "Tag DEV build" && docker tag ${DOCKER_WEB_IMAGE}:${VERSION}-SNAPSHOT ${DOCKER_WEB_IMAGE}:SNAPSHOT
echo "Push DEV image" && docker push ${DOCKER_WEB_IMAGE}:SNAPSHOT
