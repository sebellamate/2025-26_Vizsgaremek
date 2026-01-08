const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const User = require("./User")(sequelize, DataTypes);
    const Fizetes = require("./Fizetes")(sequelize, DataTypes);
    const Kategoria = require("./Kategoria")(sequelize, DataTypes);
    const Termek = require("./Termek")(sequelize, DataTypes);
    const Rendeles = require("./Rendeles")(sequelize, DataTypes);
    const RendelesTetel = require("./RendelesTetel")(sequelize, DataTypes);
    const Szallitas = require("./Szallitas")(sequelize, DataTypes);
    const Kosar = require("./Kosar")(sequelize, DataTypes);
    const KosarTetel = require("./KosarTetel")(sequelize, DataTypes);

    Kategoria.belongsTo(Kategoria, {
        as: "SzuloKategoria",
        foreignKey: "szulo_kategoria_id",
    });

    Termek.belongsTo(Kategoria, {
        foreignKey: "kategoria_id",
    });

    Rendeles.belongsTo(User, {
        foreignKey: "vevo_id",
        as: "Vevo",
    });

    User.hasMany(Rendeles, {
        foreignKey: "vevo_id",
        as: "Rendeles",
    });

    RendelesTetel.belongsTo(Rendeles, {
        foreignKey: "rendeles_id",
    });
    RendelesTetel.belongsTo(Termek, {
        foreignKey: "termek_id",
    });

    Fizetes.belongsTo(Rendeles, {
        foreignKey: "rendeles_id",
    });

    Szallitas.belongsTo(Rendeles, {
        foreignKey: "rendeles_id",
    });

    User.hasOne(Kosar, {
        foreignKey: "user_id",
        as: "Kosar",
        onDelete: "CASCADE",
    });

    Kosar.belongsTo(User, {
        foreignKey: "user_id",
        as: "User",
    });

    Kosar.hasMany(KosarTetel, {
        foreignKey: "kosar_id",
        as: "Tetelek",
        onDelete: "CASCADE",
    });


    KosarTetel.belongsTo(Kosar, {
        foreignKey: "kosar_id",
        as: "Kosar",
    });

    KosarTetel.belongsTo(Termek, {
        foreignKey: "termek_id",
        as: "Termek",
    });

    return {
        User,
        Kategoria,
        Termek,
        Rendeles,
        RendelesTetel,
        Fizetes,
        Szallitas,
        Kosar,
        KosarTetel,
    };
};
