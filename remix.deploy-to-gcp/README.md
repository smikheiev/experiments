
# Idea

I wanted to check how to deploy a Remix application to GCP. 

# Results

That was pretty simple. Basically, Remix itself does not have a server, but it's just a request handler, so it can be hosted on any server. I decided to use Cloud Run as it's easy to deploy there - it just requires a Docker image. At first, I used Remix's build-in server (`@remix-run/serve`) as it's the easiest solution. Then I also tried Express (as it can be customized more easily). Both options work well (I didn't convert `server.js` to TS, as didn't want to spend time on it).

# How to use

1. Create a new GCP project.
2. Create a new repository in Artifact Registry.
3. Update `PROJECT_ID` and `IMAGE_REPOSITORY` variables in `build-and-deploy.sh`.
4. Run `./build-and-deploy.sh` (it should build a Docker image, push it to Artifact Registry and deploy to Cloud Run).
