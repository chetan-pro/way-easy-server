'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MenuFoodCategory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            MenuFoodCategory.hasMany(models.MenuFood, {
                sourceKey: 'id',
                foreignKey: 'menu_food_category_id',
            })
        }
    }
    MenuFoodCategory.init({
        category_name: DataTypes.STRING,
        category_description: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'MenuFoodCategory',
        tableName: 'menu_food_categories',
    });
    return MenuFoodCategory;
};