resource "google_project_service" "cloudbilling" {
  project = google_project.terraform-admin.project_id
  service = "cloudbilling.googleapis.com"
}
