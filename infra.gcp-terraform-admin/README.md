# Idea

I wanted to check how to manage infrastructure without using admin accounts or assigning permissions to user accounts or handling service account keys. So, eg. `user@org.com` should be able to manage infrastructure without having any permissions and without having to use service account keys. And it'll be beneficial for CI - not to have any user credentials or service account keys in the CI config.

# Results

We can use a service account with necessary permissions (editor, and a few more roles) for managing infrastructure. So a regular user won't need to have any permissions. To avoid having to use service account keys, we can impersonate the service account, so basically we'll authenticate with our account (`user@org,com`) but run changes on behalf of the service account. We can add permissions to impersonate the service account to google group, then it's easy to control which users can impersonate the service account and therefore can manage infrastructure.
Commits history should show all the steps I made to achieve this.

# How to use

1. Create `gcp-terraform-admin` group in Google Admin and add your user to it.
2. Add `terraform.tfvars` file to the `demo` and `terraformc-admin` folders (check `variables.tf` to see the variables that should be set).
3. Run `run-terraform-admin.sh` script (use admin account when the script asks to login to gcloud). It'll create a new "terraform-admin" project and a service account with permissions to manage infrastructure.
4. Run `run-demo.sh` script (use your user account when the script asks to login to gcloud). It'll create a demo project and ask you to test it (there'll be a url in the output), after that it'll destroy the demo project.
5. Run `GOOGLE_OAUTH_ACCESS_TOKEN=$(gcloud auth print-access-token) terraform -chdir=terraform-admin destroy` to destroy the "terraform-admin" project.
