const { Router } = require("express");
const { check } = require("express-validator");

const { meetingsPost } = require("../controllers/meeting");

const routerMeetings = Router();

routerMeetings.post("/", meetingsPost);

module.exports = routerMeetings;
