// imoprts
const express = require("express");
const projectsRouter = require("./Routes/projectsRoutes");

const server = express();
server.use(express.json());
server.use(Logger);

server.use("/api/projects", projectsRouter);

function Logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}
      )}`
  );

  next();
}

module.exports = server;
