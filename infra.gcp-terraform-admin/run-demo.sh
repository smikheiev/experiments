#!/bin/bash

folder=demo

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

# Test that demo project works
echo ""
echo "Infra applied. Demo project URL: $(terraform -chdir=$folder output hello-world-url)"
read -p "Test that demo project works and press Enter to continue"

# Destroy infra
echo ""
read -p "Press Enter to destroy infra"

GOOGLE_OAUTH_ACCESS_TOKEN=$(gcloud auth print-access-token) terraform -chdir=$folder destroy

# Logout from gcloud
gcloud auth revoke --all

# Login to gcloud as user
echo ""
echo "Login to gcloud as user"
gcloud auth login

# Apply infra
echo ""
read -p "Press Enter to apply infra"

GOOGLE_OAUTH_ACCESS_TOKEN=$(gcloud auth print-access-token) terraform -chdir=$folder apply

# Check that infra was not applied
if [[ $? -ne 0 ]]; then
    echo ""
    echo "✅ Infra was not applied, because user does not have permissions"
else
    echo ""
    echo "🛑 Infra was applied, but it should not have been"
    exit 1
fi

# Logout from gcloud
gcloud auth revoke --all
