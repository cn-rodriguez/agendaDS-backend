const { Schema, model } = require("mongoose");

const infoScheduleSchema = new Schema({});

const daySchema = new Schema({
  monday: {
    type: [],
  },
  tuesday: {
    type: [],
  },
  wednesday: {
    type: [],
  },
  thursday: {
    type: [],
  },
  friday: {
    type: [],
  },
});

const ScheduleTeacherSchema = new Schema({
  idTeacher: {
    type: String,
    required: [true, "El idStudent es obligatorio"],
  },

  Schedule: {
    type: [daySchema],
    // required: [true, "Schedule es obligatorio"],
  },
});

const ScheduleTeacher = model("ScheduleTeacher", ScheduleTeacherSchema);

module.exports = ScheduleTeacher;

// const timeDateSchema = new Schema({
//   start: Date,
//   end: Date,
// });

// const infoScheduleSchema = new Schema({
//   time: {
//     type: [timeDateSchema],
//     required: true,
//   },
//   repeat: {
//     type: Boolean,
//     default: true,
//   },
// });

// const daySchema = new Schema({
//   monday: {
//     type: [infoScheduleSchema],
//   },
//   thuesday: {
//     type: [infoScheduleSchema],
//   },
//   wednesday: {
//     type: [infoScheduleSchema],
//   },
//   thursday: {
//     type: [infoScheduleSchema],
//   },
//   friday: {
//     type: [infoScheduleSchema],
//   },
// });
