const datetime = function () {
  const date = require("date-and-time");
  const dt = new Date();
  return date.format(dt, "DD/MM/YYYY");
};

module.exports.date = datetime;
