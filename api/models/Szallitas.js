const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Szallitas extends Model {};
    
    Szallitas.init({
        szallitas_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        }, rendeles_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, cim: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }, varos: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }, iranyitoszam: {
            type: DataTypes.STRING(10),
            allowNull: false,
        }, szallito_mod: {
            type: DataTypes.ENUM('futár', 'posta', 'csomagpont'),
            allowNull: false,
        }}, {sequelize, modelName: "szallitas", freezeTableName: true, timestamps: false}); // Foreign key [index.js]
    
    return Szallitas;
}