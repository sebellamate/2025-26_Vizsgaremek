const { DbError } = require("../errors");

class KategoriaRepository {
    constructor(db) {
        this.Kategoria = db.Kategoria;

        this.sequelize = db.sequelize;
    }

    async getKategoriak() {
        try {
            return await this.Kategoria.findAll();
        } catch (error) {
            throw new DbError("Failed fetching the categories", { details: error.message, sqlMsg: error.sqlMessage });
        }
    }
}
module.exports = KategoriaRepository;