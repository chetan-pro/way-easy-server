'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserLiked extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            UserLiked.hasOne(models.Client, {
                    sourceKey: 'client_id',
                    foreignKey: 'id',
                }),
                UserLiked.hasOne(models.User, {
                    sourceKey: 'user_id',
                    foreignKey: 'id',
                })
        }
    }
    UserLiked.init({
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Client',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            comment: '0:inactive,1:active,2:delete',
        },
    }, {
        sequelize,
        modelName: 'UserLiked',
        tableName: 'user_liked'
    });
    return UserLiked;
};