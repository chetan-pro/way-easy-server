'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClientFoodTypes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            ClientFoodTypes.hasOne(models.FoodType, {
                sourceKey: 'food_type_id',
                foreignKey: 'id',
            })
        }
    }
    ClientFoodTypes.init({
        client_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Client',
                key: 'id',
            },
        },
        food_type_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'FoodType',
                key: 'id',
            },
        }
    }, {
        sequelize,
        modelName: 'ClientFoodTypes',
        tableName: 'client_food_types'
    });
    return ClientFoodTypes;
};