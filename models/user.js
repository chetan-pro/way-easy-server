'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init({
        name: DataTypes.STRING(100),
        email: {
            type: DataTypes.STRING(200),
            unique: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        phonenumber: DataTypes.STRING(15),
        longitude: DataTypes.TEXT,
        latitude: DataTypes.TEXT,
        image_url: DataTypes.TEXT,
        address: DataTypes.INTEGER,
        state_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'State',
                key: 'id',
            },
        },
        city_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'city',
                key: 'id',
            },
        },
        reset_token: {
            type: DataTypes.TEXT,
            defaultValue: '',
        },
        referrer_code: DataTypes.STRING,
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            comment: '0-inactive, 1-active, 2-deleted ,4-un_verify',
        },
    }, {
        sequelize,
        timestamps: true,
        modelName: 'User',
        tableName: 'users',
        indexes: [{
                unique: true,
                fields: ['phonenumber', 'email', 'referrer_code'],
            },
            {
                unique: false,
                fields: ['state_id', 'city_id'],
            },
        ]
    });
    return User;
};