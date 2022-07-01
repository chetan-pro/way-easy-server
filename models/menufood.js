'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MenuFood extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            MenuFood.hasOne(models.MenuFoodCategory, {
                sourceKey: 'menu_food_category_id',
                foreignKey: 'id',
            })
        }
    }
    MenuFood.init({
        food_name: {
            type: DataTypes.STRING
        },
        food_description: {
            type: DataTypes.STRING
        },
        full_charge: {
            type: DataTypes.INTEGER
        },
        half_charge: {
            type: DataTypes.INTEGER
        },
        client_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Client',
                key: 'id',
            },
        },
        menu_food_category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'MenuFoodCategory',
                key: 'id',
            },
        },
    }, {
        sequelize,
        modelName: 'MenuFood',
        tableName: 'menu_foods'
    });
    return MenuFood;
};