'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClientPartyType extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            ClientPartyType.hasOne(models.PartyType, {
                sourceKey: 'party_type_id',
                foreignKey: 'id',
            })
        }
    }
    ClientPartyType.init({
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
        }
    }, {
        sequelize,
        modelName: 'ClientPartyType',
        tableName: 'client_party_types'
    });
    return ClientPartyType;
};