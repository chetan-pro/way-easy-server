'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClientWeekDays extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ClientWeekDays.init({
        client_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Client',
                key: 'id',
            },
        },
        week_day_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'WeekDays',
                key: 'id',
            },
        }
    }, {
        sequelize,
        modelName: 'ClientWeekDays',
        tableName: 'client_week_days'
    });
    return ClientWeekDays;
};