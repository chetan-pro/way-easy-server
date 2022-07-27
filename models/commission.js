'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Commission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Commission.init({
        range_from: DataTypes.INTEGER,
        range_to: DataTypes.INTEGER,
        commission: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Commission'
    });
    return Commission;
};