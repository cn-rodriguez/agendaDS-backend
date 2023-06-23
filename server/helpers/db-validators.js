const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`Role ${role} does not exist`);
  }
};

const emailExist = async (email = "") => {
  const userEmailExist = await User.findOne({ email });
  if (userEmailExist) {
    throw new Error(`Email ${email} already exists`);
  }
};

module.exports = { isValidRole, emailExist };
