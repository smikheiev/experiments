# Idea

I wanted to test how easy it is to use firebase functions for development and deployment. In particular:
- how to run them locally during development (with hot reload, and if possible using docker)
- whether it's possible to use graphql with firebase functions
- how easy it is to deploy firebase functions

# Result

## Local development

Firebase functions can be run locally with emulator suit:
```
firebase emulators:start --only functions
```

As Typescript is used, it needs to be compiled first:
```
yarn tsc && firebase emulators:start --only functions
```

Typescript's watch mode can be used for hot reload:
```
yarn tsc --watch | firebase emulators:start --only functions
```

## Docker

Firebase emulator suit can be run in docker pretty easily. I added a `Dockerfile` for emulator suit (an image with `firebase-tools` installed, which exposes ports used by the emulator suit), and used Docker Compose to run it.

I didn't add any files to the docker image, but just mapped the root directory to the container's `workspace` directory (`volumes: - ..:/workspace`), which allows using hot reload with docker.

An important thing is to set `"host": "0.0.0.0"` in `firebase.json` for each emulated service, to make it available from outside of the container's locahost.

The local environment can then be run just with
```
docker compose -f docker/docker-compose.yml up -d
```

## GraphQL

Apollo Server can be used with Google Cloud Functions using [apollo-server-cloud-functions](https://github.com/apollographql/apollo-server/tree/main/packages/apollo-server-cloud-functions) package. It has `createHandler` method, that should be used as a function's request handler.

## Deployment

Firebase functions can be deployed with
```
firebase deploy --only functions
```

As Typescript is used, it needs to be compiled first. `predeploy` hook is used for it (in `firebase.json`):
```
"predeploy": ["yarn build"]
```

# How to use

```
cd firebase.functions
yarn
```

To start local environment (docker should be installed):
```
yarn start
```

Logs can be checked with
```
docker logs experiments-firebase.functions-emulator
```

When emulator has started, two endpoints should be available - http://0.0.0.0:5001/experiments-firebase-functions/us-central1/helloWorld and http://0.0.0.0:5001/experiments-firebase-functions/us-central1/graphql:

```
curl http://0.0.0.0:5001/experiments-firebase-functions/us-central1/helloWorld
```

```
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"query":"query hello($name: String){hello(name:$name)}","variables":"{\"name\":\"Bobby\"}"}' \
  http://0.0.0.0:5001/experiments-firebase-functions/us-central1/graphql
```

To deploy (_this probably won't work, as the firebase project has already beed removed for the Google Cloud_):
```
yarn deploy
```
