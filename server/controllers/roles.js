const { response, request } = require("express");

const Role = require("../models/role");

const getAllRoles = async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
};

module.exports = { getAllRoles };
