resource "google_project_service" "cloudbilling" {
  project = google_project.terraform-admin.project_id
  service = "cloudbilling.googleapis.com"
}

resource "google_project_service" "cloudresourcemanager" {
  project = google_project.terraform-admin.project_id
  service = "cloudresourcemanager.googleapis.com"
}

resource "google_project_service" "iam" {
  project = google_project.terraform-admin.project_id
  service = "iam.googleapis.com"
}

resource "google_project_service" "serviceusage" {
  project = google_project.terraform-admin.project_id
  service = "serviceusage.googleapis.com"
}
