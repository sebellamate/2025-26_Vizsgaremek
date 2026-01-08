const { DbError } = require("../errors");

class CartRepository {
    constructor(db) {
        this.Kosar = db.Kosar;
        this.sequelize = db.sequelize;
    }
    async getCart(user_id) {
        try {
            return await this.Kosar.findOne(
                {
                    where: { user_id }
                })

        } catch (error) {
            throw new DbError("Failed fetching the cart", { details: error.message, sqlMsg: error.sqlMessage });
        }
    }
}
module.exports = CartRepository