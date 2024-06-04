resource "google_project_service" "cloudbilling" {
  project = google_project.terraform-admin.project_id
  service = "cloudbilling.googleapis.com"
}

resource "google_project_service" "serviceusage" {
  project = google_project.terraform-admin.project_id
  service = "serviceusage.googleapis.com"
}
