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

const meetingsPost = async (req = request, res = response) => {
  console.log("Hola");
};

module.exports = {
  meetingsPost,
};
