const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Rendeles extends Model {};
    Rendeles.init({
        fizetes_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        }, rendeles_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, mod: {
            type: DataTypes.ENUM('kartya', 'atvetel', 'utanvet'),
            allowNull: false,
        }, datum: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }, statusz: {
            type: DataTypes.ENUM('sikeres', 'sikertelen', 'fuggoben'),
            defaultValue: 'fuggoben',
        }}, {sequelize, modelName: "fizetes", freezeTableName: true, createdAt: "datum", updatedAt: false}); // Foreign key [index.js]

    return Rendeles;
}