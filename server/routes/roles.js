const { Router } = require("express");

const { getAllRoles } = require("../controllers/roles");

const routerRoles = Router();

routerRoles.get("/", getAllRoles);

module.exports = routerRoles;
