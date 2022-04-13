'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Client extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Client.hasMany(models.ClientImages, {
                    sourceKey: 'id',
                    foreignKey: 'client_id',
                }),
                Client.hasMany(models.ClientPartyType, {
                    sourceKey: 'id',
                    foreignKey: 'client_id',
                }),
                Client.hasMany(models.ClientFoodTypes, {
                    sourceKey: 'id',
                    foreignKey: 'client_id',
                }),
                Client.hasMany(models.ClientWeekDays, {
                    sourceKey: 'id',
                    foreignKey: 'client_id',
                }),
                Client.hasMany(models.ClientOtherServices, {
                    sourceKey: 'id',
                    foreignKey: 'client_id',
                }),
                Client.hasMany(models.ClientDJ, {
                    sourceKey: 'id',
                    foreignKey: 'client_id',
                }),
                Client.hasMany(models.ClientDecorator, {
                    sourceKey: 'id',
                    foreignKey: 'client_id',
                }),
                Client.hasOne(models.UserLiked, {
                    sourceKey: 'id',
                    foreignKey: 'client_id',
                })
            Client.hasMany(models.ClientSpace, {
                sourceKey: 'id',
                foreignKey: 'client_id',
            })
        }
    }
    Client.init({
        owner_name: DataTypes.STRING(100),
        place_name: DataTypes.STRING(100),
        email: {
            type: DataTypes.STRING(200),
            unique: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        owner_phonenumber: DataTypes.STRING(15),
        manager_phonenumber: DataTypes.STRING(15),
        locality: DataTypes.STRING(100),
        longitude: DataTypes.TEXT,
        latitude: DataTypes.TEXT,
        virtual_video_url: DataTypes.TEXT,
        max_capacity: DataTypes.INTEGER,
        address: DataTypes.INTEGER,
        allow_outside_decoration: DataTypes.BOOLEAN,
        allow_outside_dj: DataTypes.BOOLEAN,
        opening_time: DataTypes.DATE,
        closing_time: DataTypes.DATE,
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
        logo: {
            type: DataTypes.TEXT,
            allowNull: true,
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
        modelName: 'Client',
        tableName: 'clients',
        indexes: [{
                unique: true,
                fields: ['email', 'referrer_code'],
            },
            {
                unique: false,
                fields: ['state_id', 'city_id'],
            },
        ]
    });
    return Client;
};