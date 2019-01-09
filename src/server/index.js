require("@babel/register");

const config = require("config");
const { app } = require("./app");
module.exports = app(config).start();
