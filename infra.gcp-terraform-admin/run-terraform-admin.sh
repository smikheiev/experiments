#!/bin/bash

folder=terraform-admin

# Check if terraform.tfvars exists
if [ ! -f "$folder/terraform.tfvars" ]; then
  echo "terraform.tfvars not found"
  exit 1
fi

# Logout from gcloud
gcloud auth revoke --all

# Login to gcloud as admin
echo "Login to gcloud as admin"
gcloud auth login

# Apply infra
echo ""
read -p "Press Enter to apply infra"

GOOGLE_OAUTH_ACCESS_TOKEN=$(gcloud auth print-access-token) terraform -chdir=$folder apply

# Check that infra was applied
if [[ $? -ne 0 ]]; then
    echo ""
    echo "🛑 Infra was not applied, something went wrong"
    exit 1
fi

# Logout from gcloud
gcloud auth revoke --all
