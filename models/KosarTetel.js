const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class KosarTetel extends Model {}

    KosarTetel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            kosar_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            termek_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            mennyiseg: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
                validate: {
                    min: 1,
                },
            },
        },
        {
            sequelize,
            modelName: "KosarTetel",
            tableName: "kosar_tetelek",
            timestamps: false,
            indexes: [
                {
                    unique: true,
                    fields: ["kosar_id", "termek_id"], // egy termék csak egyszer lehet a kosárban
                },
            ],
        }
    );

    return KosarTetel;
};
