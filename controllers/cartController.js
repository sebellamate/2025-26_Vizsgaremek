const db = require("../db")
const { cartService } = require("../services")(db)
exports.getCart = async (req,res,next) => {
    const user_id = req.user_id;
    res.status(200).json(await cartService.getCart(user_id));
}