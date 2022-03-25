'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Clients', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            owner_name: Sequelize.STRING(100),
            place_name: Sequelize.STRING(100),
            email: {
                type: Sequelize.STRING(200),
                unique: true
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            owner_phonenumber: Sequelize.STRING(15),
            manager_phonenumber: Sequelize.STRING(15),
            locality: Sequelize.STRING(100),
            longitude: Sequelize.TEXT,
            latitude: Sequelize.TEXT,
            virtual_video_url: Sequelize.TEXT,
            max_capacity: Sequelize.INTEGER,
            address: Sequelize.INTEGER,
            allow_outside_decoration: Sequelize.BOOLEAN,
            allow_outside_dj: Sequelize.BOOLEAN,
            opening_time: Sequelize.DATE,
            closing_time: Sequelize.DATE,
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
            logo: {
                type: Sequelize.TEXT,
                allowNull: true,
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
        await queryInterface.dropTable('Clients');
    }
};