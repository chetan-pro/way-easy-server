'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RequestChanges extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RequestChanges.init({
    category_name: DataTypes.STRING,
    comment: DataTypes.STRING,
    field_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RequestChanges',
  });
  return RequestChanges;
};