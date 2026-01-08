const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Termek extends Model {};

    Termek.init({
        termek_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        }, nev: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }, leiras: {
            type: DataTypes.TEXT,
        }, ar: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        }, kep_url: {
            type: DataTypes.STRING(255),
        }, kategoria_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        } // Foreign key [index.js]
    }, {sequelize, modelName: "termek", freezeTableName: true, timestamps: false});

    return Termek;
}