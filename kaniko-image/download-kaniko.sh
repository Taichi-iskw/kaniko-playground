#!/bin/bash

# Settings
IMAGE="gcr.io/kaniko-project/executor:v1.21.1"
CONTAINER_NAME="kaniko-temp"
OUTPUT="./executor"

# Pull Kaniko executor from ${IMAGE}

echo "📦 Pulling Kaniko executor from ${IMAGE} ..."
docker run --rm --platform=linux/amd64 -d --name $CONTAINER_NAME $IMAGE sleep 9999

echo "📥 Copying executor binary ..."
docker cp $CONTAINER_NAME:/kaniko/executor "$OUTPUT"

echo "🧹 Cleaning up temporary container ..."
docker rm -f $CONTAINER_NAME > /dev/null

chmod +x "$OUTPUT"

echo "✅ Done! Saved to: $OUTPUT"
file "$OUTPUT"