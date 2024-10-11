#!/bin/bash

PROJECT_ID="remix-app-cloud-run"
LOCATION="us-central1"

IMAGE_REPOSITORY="remix-app"
IMAGE_NAME="remix"
IMAGE_TAG=$(date +%s)

FULL_IMAGE_URL="$LOCATION-docker.pkg.dev/$PROJECT_ID/$IMAGE_REPOSITORY/$IMAGE_NAME:$IMAGE_TAG"

SERVICE_NAME="hello-remix"

gcloud auth revoke --all

echo ""
echo "Login to gcloud"

gcloud auth login
gcloud auth configure-docker $LOCATION-docker.pkg.dev

echo ""
read -p "Press Enter to build docker image"

docker build --platform=linux/amd64 -t $IMAGE_NAME:$IMAGE_TAG .
docker tag $IMAGE_NAME:$IMAGE_TAG $FULL_IMAGE_URL

echo ""
read -p "Press Enter to push docker image to Artifact Registry"

docker push $FULL_IMAGE_URL

echo ""
read -p "Press Enter to deploy to Cloud Run"

gcloud run deploy $SERVICE_NAME \
    --image=$FULL_IMAGE_URL \
    --project=$PROJECT_ID \
    --region=$LOCATION \
    --allow-unauthenticated
