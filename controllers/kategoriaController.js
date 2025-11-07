const db = require("../db")

const { kategoriaService } = require("../services")(db)

exports.getKategoriak = async (req,res,next) => {
    res.status(200).json(await kategoriaService.getKategoriak());
}