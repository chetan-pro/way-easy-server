'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClientPlaceType extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ClientPlaceType.init({
        client_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Client',
                key: 'id',
            },
        },
        place_type_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'PlaceType',
                key: 'id',
            },
        }
    }, {
        sequelize,
        modelName: 'ClientPlaceType',
        tableName: 'client_place_types',
    });
    return ClientPlaceType;
};