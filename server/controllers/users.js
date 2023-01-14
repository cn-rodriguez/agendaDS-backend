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

module.exports = {
  usersGet,
};
