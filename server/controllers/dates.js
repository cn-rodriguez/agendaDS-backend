const { generateEvents } = require("../helpers/set-date");

const getEvents = async (req, res) => {
  const { id } = req.params;

  const events = await generateEvents(`${id}`);

  res.json({
    events,
    length: events.length,
  });
};

module.exports = { getEvents };
