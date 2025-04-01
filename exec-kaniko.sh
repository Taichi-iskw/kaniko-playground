#!/bin/bash

CLUSTER_NAME="kaniko-playground-cluster"
CONTAINER_NAME="KanikoContainer"

TASK_ID=$(aws ecs list-tasks \
  --cluster "$CLUSTER_NAME" \
  --query "taskArns[0]" \
  --output text)

echo "Connecting to ECS Exec on task: $TASK_ID"
aws ecs execute-command \
  --cluster "$CLUSTER_NAME" \
  --task "$TASK_ID" \
  --container "$CONTAINER_NAME" \
  --interactive \
  --command "/bin/sh"