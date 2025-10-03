const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Vevo extends Model {};

    Vevo.init({
            vevo_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            }, vnev: {
                type: DataTypes.STRING(100),
                allowNull: false,
            }, knew: {
                type: DataTypes.STRING(100),
                allowNull: false,
            }, email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            }, telefon: {
                type: DataTypes.STRING(20),
            }, cim: {
                type: DataTypes.STRING(255),
            }, jelszo_hash: {
                type: DataTypes.STRING(255),
                allowNull: false,
            }, regisztracio_datuma: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            }
        }, {sequelize, modelName: "vevo", freezeTableName: true, createdAt: "regisztracio_datuma", updatedAt: false});
    return Vevo;
}