const db = require("../db")

const { cartService } = require("../services")(db);

exports.getCart = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        res.status(200).json(await cartService.getCart(user_id));
    } catch (error) {
        return next(error);
    }
}   