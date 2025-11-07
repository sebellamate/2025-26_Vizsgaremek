const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Kategoria extends Model {};

    Kategoria.init({
            kategoria_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            }, nev: {
                type: DataTypes.STRING(100),
                allowNull: false,
            }, szulo_kategoria_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            } // Self-referential foreign key [index.js]
        }, {sequelize, modelName: "kategoria", freezeTableName: true, timestamps: false});
    return Kategoria;
}