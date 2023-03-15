const { Schema, model } = require("mongoose");
// idStudent: info.userLoggedId,
//       idTeacher: info.teacherId,
//       date: info.date,
//       rut: values.rut,
//       nameTutor: `${values.name} ${values.lastName}`,
//       status: "pending",

// const MeetingSchema = new Schema({
//   idStudent: {
//     type: String,
//     required: [true, "El idStudent es obligatorio"],
//   },
//   idTeacher: {
//     type: String,
//     required: [true, "El idTeacher es obligatorio"],
//   },
//   nameTeacher: {
//     type: String,
//     required: [true, "El nameTeacher es obligatorio"],
//   },
//   date: {
//     type: Date,
//     required: [true, "Date es obligatorio"],
//   },
//   time: {
//     type: String,
//     required: [true, "Date es obligatorio"],
//   },
//   rut: {
//     type: String,
//     required: [true, "Rut es obligatorio"],
//   },
//   nameTutor: {
//     type: String,
//     required: [true, "El nameTutor es obligatorio"],
//   },
//   emailStudent: {
//     type: String,
//     required: [true, "El emailStudent es obligatorio"],
//   },
//   status: {
//     type: String,
//     required: [true, "El status es obligatorio"],
//     enum: ["canceled", "pending", "completed"],
//   },
// });

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
    type: {},
  },
  rut: {
    type: String,
    required: [true, "El rut es obligatorio"],
  },
  nameTutor: {
    type: String,
    required: [true, "El nameTutor es obligatorio"],
  },
  reason: {
    type: String,
  },
  status: {
    type: String,
    required: [true, "El status es obligatorio"],
    enum: ["canceled", "pending", "completed"],
  },
});

const Meeting = model("Meeting", MeetingSchema);

module.exports = Meeting;
