import { Router as routeFactory } from "express";
import HttpStatus from "http-status";

export function routes(/* app */) {
  const router = routeFactory();

  router.use("/", (req, res) => {
    const stores = require("./data/default.json");
    res.status(HttpStatus.OK).send(stores);
  });

  return router;
}
