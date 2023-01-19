const { response, request } = require("express");
const User = require("../models/user");

const usersGet = async (req = request, res = response) => {
  const users = await User.find({});

  res.json({ users });

  // const users = await User.find({});
  // console.log(users);

  // res.json({
  //   users,
  // });
};

const usersGetOne = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  res.json({ user });
};

module.exports = {
  usersGet,
  usersGetOne,
};
