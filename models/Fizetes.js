const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Fizetes extends Model {};

    Fizetes.init({
            fizetes_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            }, rendeles_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }, osszeg: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            }, mod: {
                type: DataTypes.ENUM("kartya", "atutalas", "utanvet"),
                allowNull: false,
            }, datum: {
                type: DataTypes.DATE,
            }, statusz: {
                type: DataTypes.ENUM("sikeres", "sikertelen", "fuggoben"),
            }, 
        }, {sequelize, modelName: "fizetes", freezeTableName: true});
    return Fizetes;
}