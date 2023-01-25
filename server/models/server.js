const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";
    this.authPath = "/api/auth";
    this.meetingsPath = "/api/meetings";

    // Conectar DB
    this.connectDB();
    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/users"));
    this.app.use(this.authPath, require("../routes/auth"));

    this.app.use(this.meetingsPath, require("../routes/meetings"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
