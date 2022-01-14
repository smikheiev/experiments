import { https } from "firebase-functions";
import next from "next";

const nextjsServer = next({
  dev: false,
  conf: {
    distDir: `./dist/next`,
  },
});
const nextjsHandle = nextjsServer.getRequestHandler();

exports.nextjs = https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});
