var DataTypes = require("sequelize").DataTypes;
var _resume_safe = require("./resume_safe");

function initModels(sequelize) {
  var resume_safe = _resume_safe(sequelize, DataTypes);


  return {
    resume_safe,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
