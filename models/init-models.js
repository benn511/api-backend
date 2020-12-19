var DataTypes = require("sequelize").DataTypes;
var _Event = require("./Event");

function initModels(sequelize) {
  var Event = _Event(sequelize, DataTypes);


  return {
    Event,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
