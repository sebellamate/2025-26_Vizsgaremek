const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class RendelesTetel extends Model {};
    RendelesTetel.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        }, rendeles_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, termek_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, mennyiseg: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // minimum 0
            validate: { min: 0 }
        }, egyseg_ar: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        } // 2 foreign keys [index.js]
    }, {sequelize, modelName: "rendelestetel", freezeTableName: true, timestamps: false});
    return RendelesTetel;
}