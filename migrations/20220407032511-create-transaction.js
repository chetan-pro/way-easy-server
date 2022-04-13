'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Transactions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER,
            },
            booking_id: {
                type: Sequelize.INTEGER,
            },
            total_billing_amount: {
                type: Sequelize.INTEGER,
            },
            payment_status: {
                type: Sequelize.STRING,
                comment: 'SUCCESS,FAILED,PENDING'
            },
            transaction_id: {
                type: Sequelize.STRING,
            },
            signature_id: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('Transactions');
    }
};