#!/bin/bash

folder=demo

# Check if terraform.tfvars exists
if [ ! -f "$folder/terraform.tfvars" ]; then
  echo "terraform.tfvars not found"
  exit 1
fi

# Logout from gcloud
gcloud auth revoke --all

terraform_admin_sa_email=$(terraform -chdir=terraform-admin output -raw terraform-admin-sa-email)
echo "Terraform Admin SA email: $terraform_admin_sa_email"

# Login to gcloud as user
echo ""
echo "Login to gcloud as user"
gcloud auth login

# Apply infra
echo ""
read -p "Press Enter to apply infra"

GOOGLE_OAUTH_ACCESS_TOKEN=$(gcloud auth print-access-token --impersonate-service-account $terraform_admin_sa_email) terraform -chdir=$folder apply

# Check that infra was applied
if [[ $? -ne 0 ]]; then
    echo ""
    echo "🛑 Infra was not applied, something went wrong"
    exit 1
fi

# Test that demo project works
echo ""
echo "Infra applied. Demo project URL: $(terraform -chdir=$folder output hello-world-url)"
read -p "Test that demo project works and press Enter to continue"

# Destroy infra
echo ""
read -p "Press Enter to destroy infra"

GOOGLE_OAUTH_ACCESS_TOKEN=$(gcloud auth print-access-token --impersonate-service-account $terraform_admin_sa_email) terraform -chdir=$folder destroy

# Logout from gcloud
gcloud auth revoke --all
