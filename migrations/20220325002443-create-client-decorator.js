'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('client_decorators', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            client_id: {
                type: Sequelize.INTEGER
            },
            charge: {
                type: Sequelize.INTEGER
            },
            decorator_name: {
                type: Sequelize.STRING
            },
            decorator_description: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('client_decorators');
    }
};