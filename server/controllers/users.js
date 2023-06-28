const { response, request } = require("express");
const User = require("../models/user");
const Meetings = require("../models/meeting");

const usersGet = async (req = request, res = response) => {
  const users = await User.find({});

  res.json({ users });
};

const usersGetOne = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  res.json({ user });
};

const usersGetTeachers = async (req, res) => {
  const users = await User.find({ role: "TEACHER_ROLE" });
  res.json({ users });
};

const usersGetTeachersPIE = async (req, res) => {
  const users = await User.find({ role: "TEACHER_PIE_ROLE" });
  res.json({ users });
};

const usersGetTeachersAll = async (req, res) => {
  const users = await User.find({
    role: { $in: ["TEACHER_PIE_ROLE", "TEACHER_ROLE"] },
  });
  res.json({ users });
};

// ! INICIO

const usersTeacherStats = async (req, res) => {
  let usersMeetingsStats = [];

  const users = await User.find({
    role: {
      $in: [
        "TEACHER_PIE_ROLE",
        "TEACHER_ROLE",
        "TEACHER_STAFF_ROLE",
        "STAFF_ROLE",
      ],
    },
    status: true,
  });

  const statsMeetings = async (id) => {
    const meetingsUserPending = await Meetings.count({
      idTeacher: id,
      status: "pending",
    });

    const meetingsUserComplete = await Meetings.count({
      idTeacher: id,
      status: "completed",
    });

    const meetingsUserCanceled = await Meetings.count({
      idTeacher: id,
      status: "canceled",
    });

    const statsTemp = {
      pending: await meetingsUserPending,
      canceled: await meetingsUserCanceled,
      completed: await meetingsUserComplete,
    };

    return statsTemp;
  };

  for (let i = 0; i < users.length; i++) {
    const { _id, name, email, role, status } = users[i];
    const user = {
      _id,
      name,
      email,
      role,
      status,
      meeting: await statsMeetings(_id),
    };
    usersMeetingsStats = [...usersMeetingsStats, user];
  }

  res.json({ stats: usersMeetingsStats });
};

// ! FINAL

const userPut = async (req, res) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;
  // console.log(_id, resto);

  const user = await User.findByIdAndUpdate(_id, resto);

  // res.json({ user });
  res.status(200).json({ user: "1" });
};

const userDelete = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.body;
  const user = await User.findByIdAndUpdate(_id, { status: false });

  res.json({ user });
};

const userCreate = async (req, res) => {
  const { ...datos } = req.body;
  const userTemp = { ...datos, picture: "", status: true };

  const user = new User(userTemp);

  await user.save();

  res.json({ user });
};

const usersGetByRole = async (req, res) => {
  const { role } = req.params;

  const roleToGet = (role) => {
    switch (role) {
      case "admin":
        return "ADMIN_ROLE";
      case "teacher":
        return "TEACHER_ROLE";
      case "teacher_pie":
        return "TEACHER_PIE_ROLE";
      case "student":
        return "STUDENT_ROLE";
      case "reception":
        return "RECEPTION_ROLE";
    }
  };

  const roleFilter = roleToGet(role);

  const users = await User.find({ role: roleFilter, status: true });

  res.json({ users });
};

module.exports = {
  usersGet,
  usersGetOne,
  usersGetTeachers,
  usersGetTeachersPIE,
  usersGetTeachersAll,
  userPut,
  userDelete,
  userCreate,
  usersTeacherStats,
  usersGetByRole,
};
