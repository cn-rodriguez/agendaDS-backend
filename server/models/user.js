const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  picture: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: [
      "ADMIN_ROLE",
      "STUDENT_ROLE",
      "TEACHER_ROLE",
      "TEACHER_PIE_ROLE",
      "RECEPTION_ROLE",
    ],
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const User = model("User", UserSchema);

module.exports = User;
