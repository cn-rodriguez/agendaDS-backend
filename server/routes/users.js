const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const { usersGet, usersGetOne } = require("../controllers/users");

const routerUsers = Router();

routerUsers.get("/", usersGet);

routerUsers.get(
  "/:id",
  [check("id", "Is not a valid MongoDB ID").isMongoId(), validateFields],
  usersGetOne
);

module.exports = routerUsers;
