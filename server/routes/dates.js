const { Router } = require("express");
const { getEvents } = require("../controllers/dates");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const routerDates = Router();

routerDates.get(
  "/:id",
  [check("id", "Is not a valid MongoDB ID").isMongoId(), validateFields],
  getEvents
);

module.exports = routerDates;
