const { Router } = require("express");
const { check } = require("express-validator");

const { usersGet } = require("../controllers/users");

const routerUsers = Router();

routerUsers.get("/", usersGet);

module.exports = routerUsers;
