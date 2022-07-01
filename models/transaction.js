'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Transaction.init({
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
                model: 'Booking',
                key: 'id',
            },
        },
        total_billing_amount: {
            type: DataTypes.INTEGER,
        },
        payment_status: {
            type: DataTypes.STRING,
            comment: 'SUCCESS,FAILED,PENDING'
        },
        order_id: {
            type: DataTypes.STRING,
        },
        payment_id: {
            type: DataTypes.STRING,
        },
        signature_id: {
            type: DataTypes.STRING,
        },
        message: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: 'Transaction',
    });
    return Transaction;
};