'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderFood extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            OrderFood.hasOne(models.MenuFood, {
                sourceKey: 'food_id',
                foreignKey: 'id',
            })
        }
    }
    OrderFood.init({
        order_id: DataTypes.INTEGER,
        food_id: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'OrderFood',
        tableName: 'order_food'
    });
    return OrderFood;
};