'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('otps', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            otp: {
                type: Sequelize.INTEGER
            },
            otp_type: {
                type: Sequelize.TEXT,
                comment: '1-Email, 2-mobile',
            },
            otp_expiry: {
                defaultValue: null,
                type: Sequelize.DATE,
            },
            email: {
                allowNull: true,
                type: Sequelize.STRING(200)
            },
            mobile: {
                allowNull: true,
                type: Sequelize.STRING(15),
            },
            user_id: {
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
        await queryInterface.dropTable('otps');
    }
};