# Cloud Run function with a simple "Hello World" app
resource "google_cloud_run_v2_service" "hello-world" {
  location = var.region
  name     = "hello-world"
  project  = google_project.demo-project.project_id

  ingress = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "us-docker.pkg.dev/cloudrun/container/hello"
      resources {
        limits = {
          cpu    = "1"
          memory = "1024Mi"
        }
      }
    }
  }

  depends_on = [google_project_service.cloudrun]
}

# Make "Hello World" Cloud Run function public
resource "google_cloud_run_service_iam_binding" "hello-world" {
  location = google_cloud_run_v2_service.hello-world.location
  project  = google_cloud_run_v2_service.hello-world.project
  service  = google_cloud_run_v2_service.hello-world.name

  role = "roles/run.invoker"
  members = [
    "allUsers"
  ]
}

output "hello-world-url" {
  value = google_cloud_run_v2_service.hello-world.uri
}
