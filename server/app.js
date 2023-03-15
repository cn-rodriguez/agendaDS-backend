require("dotenv").config();
const { getDate } = require("./helpers/generate-date");
const { generateEvents } = require("./helpers/set-date");

const Server = require("./models/server");

const server = new Server();
server.listen();
