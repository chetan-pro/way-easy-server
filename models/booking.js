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
            Booking.hasOne(models.User, {
                    sourceKey: 'user_id',
                    foreignKey: 'id',
                }),
                Booking.hasOne(models.PartyType, {
                    sourceKey: 'party_type_id',
                    foreignKey: 'id',
                }),
                Booking.hasOne(models.ClientDJ, {
                    sourceKey: 'client_dj_id',
                    foreignKey: 'id',
                }),
                Booking.hasOne(models.ClientDecorator, {
                    sourceKey: 'client_decorator_id',
                    foreignKey: 'id',
                }),
                Booking.hasOne(models.ClientSpace, {
                    sourceKey: 'space_id',
                    foreignKey: 'id',
                })
            Booking.hasOne(models.Transaction, {
                sourceKey: 'txn_id',
                foreignKey: 'id',
            })
        }
    };
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
        txn_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Transaction',
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
        date_of_party: {
            type: DataTypes.DATE
        },
        from_timing_of_party: {
            type: DataTypes.TIME
        },
        to_timing_of_party: {
            type: DataTypes.TIME
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