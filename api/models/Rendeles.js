const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Rendeles extends Model {};

    Rendeles.init({
        rendeles_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        }, vevo_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, rendeles_datuma: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }, statusz: {
            type: DataTypes.ENUM('uj', 'feldolgozas', 'fizetve', 'szallitva', 'torolve'),
            allowNull: false,
            defaultValue: 'uj'
        }, osszeg: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        } // Foreign key [index.js]
    }, {sequelize, modelName: "rendeles", freezeTableName: true, timestamps: false});

    return Rendeles;
}