resource "google_project" "demo-project" {
  auto_create_network = false
  billing_account     = var.billing_account_id
  folder_id           = var.folder_id
  name                = var.project_name
  project_id          = var.project_id
}
