'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OTP extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    OTP.init({
        otp: DataTypes.INTEGER,
        email: {
            type: DataTypes.STRING(200)
        },
        mobile: DataTypes.STRING(15),
        otp_type: {
            type: DataTypes.TEXT,
            comment: '1-Email, 2-mobile'
        },
        otp_expiry: {
            type: DataTypes.DATE,
            defaultValue: null,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id',
            },
        }
    }, {
        sequelize,
        modelName: 'OTP',
    });
    return OTP;
};