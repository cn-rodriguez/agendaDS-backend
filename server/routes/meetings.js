const { Router } = require("express");
const { check } = require("express-validator");

const { meetingsPost, meetingsGetAll } = require("../controllers/meeting");

const routerMeetings = Router();

routerMeetings.get("/:id", meetingsGetAll);
routerMeetings.post("/", meetingsPost);

module.exports = routerMeetings;
