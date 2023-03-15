const { Router } = require("express");
const {
  scheduleTeacherGet,
  scheduleTeacherById,
} = require("../controllers/ScheduleTeacher");

const routerScheduleTeacher = Router();

routerScheduleTeacher.get("/:id", scheduleTeacherGet);

routerScheduleTeacher.get("/teacher/admin/:id", scheduleTeacherById);

module.exports = routerScheduleTeacher;
