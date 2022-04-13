'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('menu_foods', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            food_name: {
                type: Sequelize.STRING
            },
            food_description: {
                type: Sequelize.STRING
            },
            full_charge: {
                type: Sequelize.INTEGER
            },
            half_charge: {
                type: Sequelize.INTEGER
            },
            client_id: {
                type: Sequelize.INTEGER
            },
            menu_food_category_id: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('menu_foods');
    }
};