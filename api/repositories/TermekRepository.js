const { DbError } = require("../errors");

class TermekRepository {
    constructor(db) {
        this.Termek = db.Termek;
        this.sequelize = db.sequelize;
    }

    async getTermekek() {
        try {
            return await this.Termek.findAll();
        } catch (error) {
            throw new DbError("Failed fetching the goods", { details: error.message, sqlMsg: error.sqlMessage });
        }
    }
    async getTermek(termek_id) {
        try {
            return await this.Termek.findOne({
                where: { termek_id }
            })
        } catch (error) {
            throw new DbError("Failed fetching the given good", { details: error.message, sqlMsg: error.sqlMessage });
        }
    }
    async deleteTermek(termek_id) {
        try {
            return await this.Termek.destroy({
                where: { termek_id }
            })
        } catch (error) {
            throw new DbError("Failed deleting the given good", { details: error.message, sqlMsg: error.sqlMessage });
        }
    }
    async editTermek(termek_id, termekData) {
        try {
            await this.Termek.update(termekData, { where: { termek_id } });
        } catch (error) {
            throw new DbError("Failed editing the given good", { details: error.message, data: termekData });
        }
    }
    async postTermek(termekData) {
        try {
            return await this.Termek.create(termekData);
        }
        catch (error) {
            throw new DbError("Failed to create the item",
                {
                    details: error.message,
                    data: termekData,
                });
        }
    }
    async getTermekekBykosar_id(kosar_id) {
        try {
            const KosarTetel = this.sequelize.models.KosarTetel;

            const tetelek = await KosarTetel.findAll({
                where: { kosar_id },
                include: [
                    {
                        model: this.Termek,
                        as: "Termek",
                    },
                ],
            });

            return tetelek.map(t => ({
                ...t.Termek?.toJSON(),
                mennyiseg: t.mennyiseg,
            }));
        } catch (error) {
            throw new DbError("Failed fetching the given carts item", { details: error.message, sqlMsg: error.sqlMessage});
        }

    }

}
module.exports = TermekRepository;