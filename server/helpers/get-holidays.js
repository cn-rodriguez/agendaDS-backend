const axios = require("axios");

const getHolidays = () => {
  const year = new Date().getUTCFullYear();
  const holidays = axios
    .get("https://apis.digital.gob.cl/fl/feriados/" + year)
    .then((response) => response.data);

  return holidays;
};

module.exports = getHolidays;
