import HttpStatus from "http-status";

export function rootResource(app) {
  const { config: { services, host: { port: serviceHostPort } } } = app;

  return {
    async self(req, res) {
      const serviceMetadata = {
        name: "Mock Services Host",
        services: []
      };

      services.forEach(service => {
        const endpointPort = (serviceHostPort !== 8050) ? `:${serviceHostPort}` : "";
        const serviceEndpoint = `${req.protocol}://${req.hostname}${endpointPort}/${service.key}`;
        serviceMetadata.services.push({
          endpoint: serviceEndpoint,
          description: service.description
        });
      });

      res.status(HttpStatus.OK).send(serviceMetadata);
    }
  }
}
