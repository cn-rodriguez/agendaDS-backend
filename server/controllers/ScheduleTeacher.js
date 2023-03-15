const { response, request } = require("express");
const ScheduleTeacher = require("../models/scheduleteacher");

const scheduleTeacherGet = async (req, res) => {
  const schedules = await ScheduleTeacher.find({
    idTeacher: req.params.id,
    role: "TEACHER_ROLE",
  });
  res.json({ schedules });
};

const scheduleTeacherById = async (req, res) => {
  const schedules = await ScheduleTeacher.findOne({ idTeacher: req.params.id });

  res.json({ schedules });
};

module.exports = {
  scheduleTeacherGet,
  scheduleTeacherById,
};
