#!/bin/bash

folder=terraform-admin

# Check if terraform.tfvars exists
if [ ! -f "$folder/terraform.tfvars" ]; then
  echo "terraform.tfvars not found"
  exit 1
fi

# Logout from gcloud
gcloud auth revoke --all

# Apply infra
echo ""
read -p "Press Enter to apply infra"

GOOGLE_APPLICATION_CREDENTIALS=../terraform-admin-sa-key.json terraform -chdir=$folder apply

# Check that infra was applied
if [[ $? -ne 0 ]]; then
    echo ""
    echo "🛑 Infra was not applied, something went wrong"
    exit 1
fi

rm -f terraform-admin-sa-key.json
terraform -chdir=terraform-admin output -raw terraform-admin-sa-key > terraform-admin-sa-key.json

# Logout from gcloud
gcloud auth revoke --all
