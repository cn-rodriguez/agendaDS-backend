const axios = require("axios");
const { getDate } = require("../helpers/generate-date");
const { toCapitalize } = require("../helpers/strings-format");

const getSchedule = async (id = "63c011cdd4e0d9ed14c7fe25") => {
  const schedule = await axios.get("http://localhost:3001/api/schedule/" + id);
  const info = schedule.data;
  // console.log(info);
  return info.schedules[0];
};

const regexDate = (text, timeForReplace) => {
  const pattern = /[0-9]+(\u003A)[0-9]+\1[0-9]+/;
  const material = text.replace(pattern, timeForReplace);
  return material;
};

// const datesDays = async (day, meetingTime) => {
//   console.log(meetingTime);
//   const dates = await getDate();
//   const events = dates[toCapitalize(day)].map((date) => {
//     const temp = String(date);
//     const event = {
//       start: new Date(regexDate(temp, meetingTime.time.start)),
//       end: new Date(regexDate(temp, meetingTime.time.end)),
//     };
//     return event;
//   });
//   return events;
// };

const createEvent = (date, time) => {
  const stringDate = String(date);
  const event = {
    start: new Date(regexDate(stringDate, time.time.start)),
    end: new Date(regexDate(stringDate, time.time.end)),
  };
  // console.log(event);
  return event;
};

// const datePerSchedule = async (day, hours) => {
//   let events = [];
//   for (let i = 0; i < hours.length; i++) {
//     events = await datesDays(day, hours[i]);
//   }
//   console.log(events);
//   return events;
// };

// const generateEvents = async (id) => {
//   const schedule = await getSchedule(id);
//   const days = schedule[0].Schedule[0];
//   const { _id, ...daySchedule } = days;
//   let events = [];

//   for (dayList in daySchedule) {
//     if (daySchedule[dayList].length > 0) {
//       events = [
//         await datePerSchedule(dayList, daySchedule[dayList]),
//         ...events,
//       ];
//     }
//   }
//   return events;
// };

const scheduleGet = async (id) => {
  const { Schedule } = await getSchedule(id);
  const { _id, ...schedule } = Schedule[0];
  return schedule;
};

// 38 41 42 44 41

const looksEmpty = (schedule) => !schedule.length;

const getDatesWeekDay = async (weekDay, dates) => {
  const day = dates[toCapitalize(weekDay)];

  // console.log(day, day.length);
  return day;
};

const generateSchedule = (time, dates) => {
  const schedule = dates.map((date) => {
    const event = createEvent(date, time);
    return event;
  });
  return schedule;
};

const generateEvents = async (id) => {
  // schedule = await scheduleGet(id);
  const schedule = await scheduleGet(id);
  let dates = await getDate();
  let events = [];
  // console.log(dates);
  for (day in schedule) {
    if (!looksEmpty(schedule[day])) {
      let dayDates = await getDatesWeekDay(day, dates);
      const tempEvents = schedule[day].map((time) => {
        const auxSchedule = generateSchedule(time, dayDates);
        // console.log(auxSchedule);
        events = [...events, ...auxSchedule];
        return auxSchedule;
      });
      // events = [...events, ...tempEvents];
    }
  }
  console.log(
    "🚀 ~ file: set-date.js:105 ~ generateEvents ~ events",
    events,
    events.length
  );
  // console.log("🚀 ~ file: set-date.js:107 ~ generateEvents ~ events", events);
  // console.log(await events);
  //     const weekDay = await getDatesWeekDay(day);
  //     // console.log(weekDay);
  //     // console.log(day, schedule[day]);
  //   }
  // }

  // for (day in schedule) {
  //   if (!looksEmpty(schedule[day])) {
  //     getDatesWeekDay(day);
  //   }
  // }
  return events;
};

module.exports = { generateEvents };
