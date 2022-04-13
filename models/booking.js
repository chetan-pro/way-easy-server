'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Booking.init({
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        client_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Client',
                key: 'id',
            },
        },
        party_type_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'PartyType',
                key: 'id',
            },
        },
        data_of_party: {
            type: DataTypes.DATE
        },
        from_timing_of_party: {
            type: DataTypes.DATE
        },
        to_timing_of_party: {
            type: DataTypes.DATE
        },
        status_client: {
            type: DataTypes.STRING,
            comment: 'ACCEPT,REJECT,PENDING'
        },
        status_user: {
            type: DataTypes.STRING,
            comment: 'REQUEST,CANCEL'
        },
        space_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ClientSpace',
                key: 'id',
            },
        },
        client_decorator_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ClientDecorator',
                key: 'id',
            },
        },
        client_dj_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ClientDJ',
                key: 'id',
            },
        },
        booking_charge: {
            type: DataTypes.INTEGER,
        },
        food_charge: {
            type: DataTypes.INTEGER
        },
        total_charge: {
            type: DataTypes.INTEGER,
        },
        num_of_people: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};