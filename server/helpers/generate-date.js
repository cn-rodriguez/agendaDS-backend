const moment = require("moment");
const getHolidays = require("./get-holidays");

var months = [
  { month: 3, days: 31 },
  { month: 4, days: 30 },
  { month: 5, days: 31 },
  { month: 6, days: 30 },
  { month: 7, days: 31 },
  { month: 8, days: 31 },
  { month: 9, days: 30 },
  { month: 10, days: 31 },
  { month: 11, days: 30 },
  { month: 12, days: 31 },
];

const generateDates = async () => {
  let dates = [];
  const holidays = await returnHolidays();
  const year = new Date().getUTCFullYear();
  for (info in months) {
    for (let i = 1; i <= months[info].days; i++) {
      let date = new Date(year, months[info].month - 1, i, 0, 0, 0, 0);
      // date = Date.parse(date);
      (await removeHolidays(date, holidays))
        ? (dates = [...dates, date])
        : null;
    }
  }
  return dates;
};

const returnHolidays = async () => {
  let holidays = await getHolidays();
  // console.log(holidays);
  const dateHolidays = holidays.map((holiday) => {
    const { fecha } = holiday;
    const aux = new Date(fecha);
    const temp = moment.utc(aux).format("YYYY-MM-DD");
    return temp;
  });

  return dateHolidays;
};

const removeHolidays = async (date, holidays) => {
  let dateParsed = moment.utc(date).format("YYYY-MM-DD");
  const isIn = holidays.includes(dateParsed);
  return !isIn;
};

// const datesWeekDay = async () => {
//   const dates = await generateDates();

//   dates.forEach((date) => {
//     let aux = new Date(date);
//     aux = Date.parse(aux);
//     console.log(aux, new Date(date).getUTCDay());
//   });
// };
// const setDays = (date) => {
//   const day = date.getUTCDay();
//   //   console.log(day);
//   //   console.log(nameDay(day));
//   switch (day) {
//     case 1:
//       datePerDays.Monday = [...datePerDays.Monday, date];
//       break;
//     case 2:
//       datePerDays.Tuesday = [...datePerDays.Tuesday, date];
//       break;
//     case 3:
//       datePerDays.Wednesday = [...datePerDays.Wednesday, date];
//       break;
//     case 4:
//       datePerDays.Thursday = [...datePerDays.Thursday, date];
//       break;
//     case 5:
//       datePerDays.Friday = [...datePerDays.Friday, date];
//       break;
//     default:
//       break;
//   }
// };

const setDate = (date, datePerDay) => {
  const day = date.getUTCDay();
  switch (day) {
    case 1:
      datePerDay.Monday = [...datePerDay.Monday, date];

      break;
    case 2:
      datePerDay.Tuesday = [...datePerDay.Tuesday, date];
      break;

    case 3:
      datePerDay.Wednesday = [...datePerDay.Wednesday, date];
      break;

    case 4:
      datePerDay.Thursday = [...datePerDay.Thursday, date];
      break;

    case 5:
      datePerDay.Friday = [...datePerDay.Friday, date];
      break;
    default:
      break;
  }
};

// const loopingDate = () => {
//   const year = new Date().getFullYear();
//   months.map((month) => {
//     for (let i = 1; i <= month.days; i++) {
//       let dateToSave = new Date(`${year}-${month.month}-${i}`);
//       setDays(dateToSave);
//     }
//   });
// };

const weekDay = async (dates, datePerDay) => {
  dates.forEach((date) => setDate(date, datePerDay));
};

const getDate = async () => {
  // await setDates();
  let datePerDays = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  };
  const dates = await generateDates();
  await weekDay(dates, datePerDays);
  // console.log(datePerDays);

  // console.log(await returnHolidays());
  // await datesWeekDay();
  // console.log(dates);
  return datePerDays;
};

// const cleanDates = async () => {
//   const holidays = await getHolidays();
//   // console.log(days);
//   holidays.map((holiday) => checkDay(new Date(holiday.fecha)));
// };

// const checkDay = (day) => {
//   const dayPos = day.getUTCDay();
//   switch (dayPos) {
//     case 1:
//       compareDay(day, "Monday");
//       break;
//     case 2:
//       compareDay(day, "Tuesday");
//       break;
//     case 3:
//       compareDay(day, "Wednesday");
//       break;
//     case 4:
//       compareDay(day, "Thursday");
//       break;
//     case 5:
//       compareDay(day, "Friday");
//       break;
//   }
// };

// const compareDay = (day, array) => {
//   // const dayValidate = `${date.getFullYear()}-${date.getMonth()}-${date.getUTCDate()}`;
//   // console.log(array, datePerDays[array]);
//   // console.log(day);
//   // for (let date in datePerDays[array]) {
//   //   console.log("comparing:", date, day);
//   // }
//   for (let i = 0; i < datePerDays[array].length; i++) {
//     const dayHoliday = `${day.getFullYear()}-${
//       day.getUTCMonth() + 1
//     }-${day.getUTCDate()}`;

//     const dateToCompare = `${datePerDays[array][i].getFullYear()}-${
//       datePerDays[array][i].getUTCMonth() + 1
//     }-${datePerDays[array][i].getUTCDate()}`;

//     // console.log(dayHoliday, dateToCompare);
//     if (dateToCompare == dayHoliday) {
//       // console.log("comparing:", datePerDays[array][i], day);
//       datePerDays[array].splice(i, 1);
//       // console.log(array, datePerDays[array]);
//     }
//   }
// };

// const setDates = async () => {
//   await loopingDate();
//   await cleanDates();
//   // console.log(datePerDays);
// };

module.exports = { getDate };
