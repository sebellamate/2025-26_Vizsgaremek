class CartService {
    constructor(db){
        this.cartRepository = require("../repositories")(db).cartRepository
    }
    async getCart(user_id){
        return await this.cartRepository.getCart(user_id)
    }
}
module.exports = CartService