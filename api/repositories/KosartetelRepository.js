const { DbError } = require("../errors");

class KosartetelRepository {
    constructor(db) {
        this.Kosartetel = db.KosarTetel;

        this.sequelize = db.sequelize;
    }
    async postTetel(tetelData) {
        try {
            return await this.Kosartetel.create(tetelData)
        } catch (error) {
            throw new DbError("Failed to create the item", { details: error.message, data:tetelData });
        }
    }
    async getTetel(id) {
        try {
            return await this.Kosartetel.findOne({
                where: { id }
            })
        } catch (error) {
            throw new DbError("Failed fetching the given item", { details: error.message, sqlMsg: error.sqlMessage });
        }

    }
    async getTetelek(kosar_id) {
        try {
            return await this.Kosartetel.findAll({
                where: { kosar_id }
            })
        } catch (error) {
            throw new DbError("Failed fetching the given items", { details: error.message, sqlMsg: error.sqlMessage });
        }
    }
}
module.exports = KosartetelRepository;