const { Router } = require("express");
const { check } = require("express-validator");

const {
  meetingsPost,
  meetingsGetAll,
  meetingGetNext,
  meetingGetNextTeacher,
  meetingsGetAllTeacher,
  meetingUpdateStatus,
} = require("../controllers/meeting");

const routerMeetings = Router();

routerMeetings.get("/:id", meetingsGetAll);
routerMeetings.get("/teacher/:id", meetingsGetAllTeacher);
routerMeetings.get("/next/:id", meetingGetNext);
routerMeetings.get("/next/teacher/:id", meetingGetNextTeacher);

routerMeetings.post("/", meetingsPost);

routerMeetings.put("/:id", meetingUpdateStatus);

module.exports = routerMeetings;
