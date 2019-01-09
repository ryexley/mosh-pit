import { logFactory } from "./setup/logging";
import { middlewareFactory } from "./middleware";
import { serverRoutes } from "./routes";
import { serverFactory } from "./server";

export function app(config) {
  const { name, host: { port, name: hostName }, logging } = config;
  const log = logFactory({ name, ...logging, pattern: process.env.DEBUG });

  const app = {
    config,
    log,
    start() {
      app.server.listen(port, hostName, () => {
        app.log.info("%s started, listening on port %d", name, port);
      });
    }
  };

  const routes = serverRoutes(app);

  app.middleware = middlewareFactory(app);
  app.server = serverFactory(app, routes);

  return app;
};
