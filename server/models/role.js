const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
});

const Role = model("Role", RoleSchema);

module.exports = Role;
