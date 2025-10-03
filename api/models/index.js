const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    // foreign key linking happens here
    const Vevo = require("./Vevo")(sequelize, DataTypes);
    // ===== [ Foreign Keys for Vevo ] =====
    // none
    // =====================================
    
    const Kategoria = require("./Kategoria")(sequelize, DataTypes);
    // ===== [ Foreign Keys for Kategoria ] =====
    Kategoria.belongsTo(Kategoria, {
        foreignKey: "szulo_kategoria_id",
        // targetKey: "kategoria_id", // not necessary; this is the primary key
        // as: "szulo_kategoria", // alias; possibly unneeded
        onDelete: "SET NULL"
    });
    // ==========================================

    const Termek = require("./Termek")(sequelize, DataTypes);
    // ===== [ Foreign Keys for Termek ] =====
    Termek.belongsTo(Kategoria, {
        foreignKey: "kategoria_id",
        onDelete: "SET NULL"
    });
    // =======================================

    const Rendeles = require("./Rendeles")(sequelize, DataTypes);
    // ===== [ Foreign Keys for Rendeles ] =====
    Rendeles.belongsTo(Vevo, {
        foreignKey: "vevo_id",
        onDelete: "CASCADE"
    });
    // =========================================

    const RendelesTetel = require("./RendelesTetel")(sequelize, DataTypes);
    // ===== [ Foreign Keys for RendelesTetel ] =====
    RendelesTetel.belongsTo(Rendeles, {
        foreignKey: "rendeles_id",
        onDelete: "CASCADE"
    });
    RendelesTetel.belongsTo(Termek, {
        foreignKey: "termek_id",
        onDelete: "CASCADE"
    });
    // ==============================================

    const Fizetes = require("./Fizetes")(sequelize, DataTypes);
    // ===== [ Foreign Keys for Fizetes ] =====
    Fizetes.belongsTo(Rendeles, {
        foreignKey: "rendeles_id",
        onDelete: "CASCADE"
    });
    // =======================================

    const Szallitas = require("./Szallitas")(sequelize, DataTypes);
    // ===== [ Foreign Keys for Szallitas ] =====
    Szallitas.belongsTo(Rendeles, {
        foreignKey: "rendeles_id",
        onDelete: "CASCADE"
    });
    // ========================================

    return {Vevo, Kategoria, Termek, Rendeles, RendelesTetel, Fizetes, Szallitas};
}