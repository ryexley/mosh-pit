import express from "express";
import cors from "cors";

export function serverFactory(app, routes) {
  const server = express();

  // pre-routing middleware
  server
    .use(cors()) // TODO: add whitelist configuration to cors middleware
    .use(app.middleware.requestCorrelationId)
    .use(app.middleware.requestLogger)
    .use(app.middleware.responseLogger);

  server.use("/", routes);

  // post-routing middleware
  server
    .use(app.middleware.notFound)
    .use(app.middleware.errorHandler);

  return server;
}
