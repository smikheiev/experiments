resource "google_service_account" "terraform-admin-sa" {
  account_id   = "terraform-admin"
  display_name = "Terraform Admin"
  project      = google_project.terraform-admin.project_id
}

resource "google_folder_iam_member" "terraform-admin" {
  for_each = toset([
    "roles/editor",
  ])

  folder = var.folder_id
  member = "serviceAccount:${google_service_account.terraform-admin-sa.email}"
  role   = each.key
}
