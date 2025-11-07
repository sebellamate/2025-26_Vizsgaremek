class CartRepository{
    constructor(db){
        this.Kosar = db.Kosar;
        this.sequelize = db.sequelize;
    }
    async getCart(user_id){
        return await this.Kosar.findOne({
            where: {user_id}
        })
    }
}
module.exports = CartRepository