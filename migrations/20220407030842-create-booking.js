'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Bookings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER,
            },
            client_id: {
                type: Sequelize.INTEGER,
            },
            txn_id: {
                type: Sequelize.INTEGER,
            },
            party_type_id: {
                type: Sequelize.INTEGER,
            },
            date_of_party: {
                type: Sequelize.DATE
            },
            from_timing_of_party: {
                type: Sequelize.TIME
            },
            to_timing_of_party: {
                type: Sequelize.TIME
            },
            status_client: {
                type: Sequelize.STRING,
                comment: 'ACCEPT,REJECT,PENDING'
            },
            status_user: {
                type: Sequelize.STRING,
                comment: 'REQUEST,CANCEL'
            },
            space_id: {
                type: Sequelize.INTEGER,

            },
            client_decorator_id: {
                type: Sequelize.INTEGER,

            },
            client_dj_id: {
                type: Sequelize.INTEGER,

            },
            booking_charge: {
                type: Sequelize.INTEGER,
            },
            food_charge: {
                type: Sequelize.INTEGER
            },
            total_charge: {
                type: Sequelize.INTEGER,
            },
            num_of_people: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('Bookings');
    }
};