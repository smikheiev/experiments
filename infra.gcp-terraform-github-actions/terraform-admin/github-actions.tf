
resource "google_iam_workload_identity_pool" "github_actions" {
  workload_identity_pool_id = "github-actions"

  description  = "Workload Identity Pool for GitHub Actions (managed by Terraform)"
  display_name = "GitHub Actions Pool"

  project = google_project.terraform-admin.project_id
}

resource "google_iam_workload_identity_pool_provider" "github_actions" {
  workload_identity_pool_provider_id = "github-actions"
  workload_identity_pool_id          = google_iam_workload_identity_pool.github_actions.workload_identity_pool_id

  description  = "Workload Identity Provider for GitHub Actions (managed by Terraform)"
  display_name = "GitHub Actions Provider"

  project = google_project.terraform-admin.project_id

  attribute_condition = "attribute.repository_owner == 'smikheiev'"
  attribute_mapping = {
    "google.subject"             = "assertion.sub"
    "attribute.actor"            = "assertion.actor"
    "attribute.aud"              = "assertion.aud"
    "attribute.repository"       = "assertion.repository"
    "attribute.repository_owner" = "assertion.repository_owner"
  }

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
}

output "github_actions_workload_identity_provider_name" {
  description = "Workload Identity Provider for GitHub Actions"
  value       = google_iam_workload_identity_pool_provider.github_actions.name
}

resource "google_service_account_iam_member" "terraform-admin-github-actions" {
  service_account_id = google_service_account.terraform-admin-sa.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github_actions.name}/*"
}
