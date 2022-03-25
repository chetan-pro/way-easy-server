'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: Sequelize.STRING(100),
            email: {
                type: Sequelize.STRING(200),
                unique: true
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
                unique: true
            },
            phonenumber: Sequelize.STRING(15),
            longitude: Sequelize.TEXT,
            latitude: Sequelize.TEXT,
            image_url: Sequelize.TEXT,
            address: Sequelize.INTEGER,
            state_id: {
                type: Sequelize.INTEGER,

            },
            city_id: {
                type: Sequelize.INTEGER,

            },
            reset_token: {
                type: Sequelize.TEXT,
                defaultValue: '',
            },
            referrer_code: Sequelize.STRING,
            status: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                comment: '0-inactive, 1-active, 2-deleted ,4-un_verify',
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
        await queryInterface.dropTable('users');
    }
};