const { BadRequestError, NotFoundError } = require("../errors");

class CartService {
    constructor(db){
        this.cartRepository = require("../repositories")(db).cartRepository
    }
    async getCart(user_id){
        if(!user_id) throw new BadRequestError("Missing cart identification from payload");

        const cart = await this.cartRepository.getCart(user_id);

        if (!cart) throw new NotFoundError("Can not found cart with this cart identification",
            {
                data: user_id
            });

        return cart;
    }
}
module.exports = CartService