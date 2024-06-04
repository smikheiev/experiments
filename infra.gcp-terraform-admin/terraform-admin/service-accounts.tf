resource "google_service_account" "terraform-admin-sa" {
  account_id   = "terraform-admin"
  display_name = "Terraform Admin"
  project      = google_project.terraform-admin.project_id
}

resource "google_billing_account_iam_member" "terraform-admin" {
  for_each = toset(["roles/billing.user"])

  billing_account_id = var.billing_account_id
  member             = "serviceAccount:${google_service_account.terraform-admin-sa.email}"
  role               = each.key
}

resource "google_folder_iam_member" "terraform-admin" {
  for_each = toset([
    "roles/editor",
  ])

  folder = var.folder_id
  member = "serviceAccount:${google_service_account.terraform-admin-sa.email}"
  role   = each.key
}

resource "google_service_account_key" "terraform-admin-sa" {
  service_account_id = google_service_account.terraform-admin-sa.name
}

output "terraform-admin-sa-key" {
  sensitive = true
  value     = base64decode(google_service_account_key.terraform-admin-sa.private_key)
}
