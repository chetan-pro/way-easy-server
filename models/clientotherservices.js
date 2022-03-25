'use strict';
const {
    Model
} = require('sequelize');
const otherservices = require('./otherservices');
module.exports = (sequelize, DataTypes) => {
    class ClientOtherServices extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            // define association here
        }
    }
    ClientOtherServices.init({
        client_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Client',
                key: 'id',
            },
        },
        other_service_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'OtherServices',
                key: 'id',
            },
        }
    }, {
        sequelize,
        modelName: 'ClientOtherServices',
        tableName: 'client_other_services'
    });
    return ClientOtherServices;
};