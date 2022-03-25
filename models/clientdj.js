'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClientDJ extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ClientDJ.init({
        client_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Client',
                key: 'id',
            },
        },
        charge_per_hour: DataTypes.INTEGER,
        dj_name: DataTypes.STRING,
        dj_description: DataTypes.STRING,
        privacy_type_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'PrivacyType',
                key: 'id',
            },
        },
    }, {
        sequelize,
        modelName: 'ClientDJ',
        tableName: 'client_djs'
    });
    return ClientDJ;
};