'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('client_djs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            client_id: {
                type: Sequelize.INTEGER
            },
            privacy_type_id: {
                type: Sequelize.INTEGER
            },
            charge_per_hour: {
                type: Sequelize.INTEGER
            },
            dj_name: {
                type: Sequelize.STRING
            },
            dj_description: {
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
        await queryInterface.dropTable('client_djs');
    }
};