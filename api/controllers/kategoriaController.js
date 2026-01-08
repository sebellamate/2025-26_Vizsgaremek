const db = require("../db")

const { kategoriaService } = require("../services")(db)

exports.getKategoriak = async (req,res,next) => {
    try {
        res.status(200).json(await kategoriaService.getKategoriak());
    } catch (error) {
        next(error);
    }
}