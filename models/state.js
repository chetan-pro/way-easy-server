'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class state extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            state.hasMany(models.City, {
                sourceKey: 'id',
                foreignKey: 'state_id',
            })
            state.hasMany(models.Client, {
                sourceKey: 'id',
                foreignKey: 'state_id',
            })
        }
    };
    state.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        status: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'State',
    });
    return state;
};