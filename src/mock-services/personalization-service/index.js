import { Router as routeFactory } from "express";
import HttpStatus from "http-status";

export function routes(/* app */) {
  const router = routeFactory();

  router.use("/", (req, res) => {
    const personalizationData = require("./data/default.json");
    res.status(HttpStatus.OK).send({
      resourceVersion: "1.1",
      resourceUrl: req.originalUrl,
      personalizationInfoV1: personalizationData
    });
  });

  return router;
}
