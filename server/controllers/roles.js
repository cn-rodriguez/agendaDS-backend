const { response, request } = require("express");

const Role = require("../models/Role");

const getAllRoles = async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
};

module.exports = { getAllRoles };
