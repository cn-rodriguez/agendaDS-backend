const { Schema, model } = require("mongoose");

const MeetingSchema = new Schema({
  idStudent: {
    type: String,
    required: [true, "El idStudent es obligatorio"],
  },
  idTeacher: {
    type: String,
    required: [true, "El idTeacher es obligatorio"],
  },
  nameTeacher: {
    type: String,
    required: [true, "El nameTeacher es obligatorio"],
  },
  date: {
    type: Date,
    required: [true, "Date es obligatorio"],
  },
  time: {
    type: String,
    required: [true, "Date es obligatorio"],
  },
  rut: {
    type: String,
    required: [true, "Rut es obligatorio"],
  },
  nameTutor: {
    type: String,
    required: [true, "El nameTutor es obligatorio"],
  },
  emailStudent: {
    type: String,
    required: [true, "El emailStudent es obligatorio"],
  },
  status: {
    type: String,
    required: [true, "El status es obligatorio"],
    enum: ["canceled", "pending", "completed"],
  },
});

const Meeting = model("Meeting", MeetingSchema);

module.exports = Meeting;
