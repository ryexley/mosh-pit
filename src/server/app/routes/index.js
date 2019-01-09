import { Router as routeFactory } from "express";
import bodyParser from "body-parser";
import { rootResource } from "./resource";

export function serverRoutes(app) {
  const router = routeFactory();
  const root = rootResource(app);

  router
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));

  router.route("/").get(root.self);
  router.route("/").options(root.self);

  const { config: { services: mockServices } } = app;
  mockServices.forEach(({ key: serviceKey, enabled }) => {
    if (enabled) {
      app.log.debug(`wiring up mock service endpoint for ${serviceKey}`);
      const { routes } = require(`../../../mock-services/${serviceKey}`);
      const handler = routes(app);
      router.use(`/${serviceKey}`, handler);
    }
  });

  return router;
}
