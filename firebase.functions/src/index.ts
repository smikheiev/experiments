import * as functions from "firebase-functions";
import { handler as graphqlHandler } from "./graphql";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const graphql = functions.https.onRequest((req, res) => {
  return graphqlHandler(req, res, () => {});
});
