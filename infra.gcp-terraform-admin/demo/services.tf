resource "google_project_service" "cloudrun" {
  project = google_project.demo-project.project_id
  service = "run.googleapis.com"
}
