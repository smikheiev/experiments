# Idea

I wanted to explore some ways of deploying infrastructure with GitHub Actions. In particular, using Workload Identity Federation so service account key won't be needed.

# Results

It was much simpler than I expected. At first, I used terraform-admin service account key to setup GitHub Actions workflow and make sure it works. Then I setup Workload Identity Federation, so the workflow can authenticate to GCP without the service account key - the `google-github-actions/auth` action returns access token and terraform uses it later.

GitHub Action needs two outputs from terraform: Workload Identity Provider name and Service Account email. Service Account should be terraform-admin service account, as it's the account with permissions to manage infrastructure (we need to add `workloadIdentityUser` role to it).

So basically, this is what's going on:

1. GitHub action authenticates terraform-admin service account to GCP using Workload Identity Federation.
2. As a result of authentication, we have an access token.
3. Terraform command runs plan/apply with the access token (as terraform-admin, therefore with permissions to manage infrastructure).

Commits history should show steps I made to achieve this.

I didn't explore `attribute_condition` and `attribute_mapping`, and other options for Workload Identity Provider, as it wasn't the goal of this experiment.

# How to use

1. Setup `terraform-admin` project (check readme in `infra.gcp-terraform-admin` for more details).
2. Get outputs from `terraform-admin` project: `github_actions_workload_identity_provider_name` and `terraform-admin-sa-email`.
3. Add outputs to the GitHub Actions secrets (I used names `GCP_TERRAFORM_GITHUB_ACTIONS_WORKLOAD_IDENTITY_PROVIDER_NAME` and `GCP_TERRAFORM_GITHUB_ACTIONS_WORKLOAD_IDENTITY_SA_EMAIL`).
4. Add other GitHub Actions secrets and variables that are needed for `terraform.tfvars` file (check the workflow file for the list of variables and their names).
5. Trigger GitHub Actions workflow manually from UI. It should create a new demo project.

One caveat. I didn't setup remote bucket for terraform state (to keep it simple), so GitHub Action will always try to create a new demo project instead of updating the existing one. Therefore, if you run the workflow again, it will fail with "project already exists" error. The solution is to update demo project id in GitHub Actions variables before running the workflow again.
