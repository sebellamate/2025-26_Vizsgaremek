const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Kosar extends Model {}

    Kosar.init(
        {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                field: "created_at"
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                field: "updated_at"
            },
        },
        {
            sequelize,
            modelName: "Kosar",
            tableName: "kosarak",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return Kosar;
};
