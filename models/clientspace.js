'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClientSpace extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            ClientSpace.hasMany(models.SpaceImage, {
                sourceKey: 'id',
                foreignKey: 'client_space_id',
            })
        }
    }
    ClientSpace.init({
        client_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Client',
                key: 'id',
            },
        },
        space_name: DataTypes.STRING,
        space_description: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'ClientSpace',
        tableName: 'client_spaces'
    });
    return ClientSpace;
};