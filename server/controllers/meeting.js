const { response, request } = require("express");
const Meeting = require("../models/meeting");

const meetingsGet = async (req = request, res = response) => {
  const Meetings = await Meeting.find({});

  res.json({ Meetings });

  // const users = await User.find({});
  // console.log(users);

  // res.json({
  //   users,
  // });
};

const meetingsGetAll = async (req, res) => {
  console.log(req.params);
  const Meetings = await Meeting.find({ idStudent: req.params.id }).exec();
  res.json({ Meetings });
};

const meetingsGetAllTeacher = async (req, res) => {
  console.log(req.params);
  const Meetings = await Meeting.find({ idTeacher: req.params.id }).exec();
  res.json({ Meetings });
};

const meetingGetNext = async (req, res) => {
  const { id } = req.params;

  const meetings = await Meeting.find({ idStudent: id }).exec();
  console.log(meetings);
  const fecha = new Date().getTime();
  let meeting;
  for (meet in meetings) {
    // console.log(meet);
    if (new Date(meetings[meet].date.start).getTime() > fecha) {
      meeting = meetings[meet];
    }
    break;
  }
  // console.log(new Date(meetings.date.start).getTime());

  res.json({ meeting });
};

const meetingGetNextTeacher = async (req, res) => {
  const { id } = req.params;
  const meetings = await Meeting.find({
    idTeacher: id,
  }).exec();
  const fecha = new Date().getTime();
  let meeting;
  for (meet in meetings) {
    // console.log(meet);
    if (new Date(meetings[meet].date.start).getTime() > fecha) {
      meeting = meetings[meet];
    }
    break;
  }
  res.json({ meeting });
};

const meetingUpdateStatus = async (req, res) => {
  console.log(req.body);
  const { id, status } = req.body;
  const filter = { _id: id };
  const update = { status: status };
  const meeting = await Meeting.findOneAndUpdate(filter, update);
  res.json({ meeting });
};

const meetingsPost = async (req = request, res = response) => {
  const {
    idStudent,
    idTeacher,
    nameTeacher,
    date,
    rut,
    nameTutor,
    reason,
    status,
  } = req.body;
  const meeting = new Meeting({
    idStudent,
    idTeacher,
    nameTeacher,
    date,
    rut,
    nameTutor,
    reason,
    status,
  });

  await meeting.save();
  res.json({ meeting });
};

module.exports = {
  meetingsPost,
  meetingsGetAll,
  meetingGetNext,
  meetingGetNextTeacher,
  meetingsGetAllTeacher,
  meetingUpdateStatus,
};
