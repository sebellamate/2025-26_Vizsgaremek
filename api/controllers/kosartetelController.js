const db = require("../db/index")
const { kosartetelService } = require("../services/index")(db);

exports.postTetel = async (req, res, next) => {
    const { kosar_id, termek_id, mennyiseg } = req.body;
    try {
        res.status(200).json(await kosartetelService.postTetel({ kosar_id, termek_id, mennyiseg }))
    } catch (error) {
        next(error)
    }
}
exports.getTetel = async (req, res, next) => {
    const id = req.id;
    try {
        res.status(200).json(await kosartetelService.getTetel(id));
    } catch (error) {
        next(error)
    }
}
exports.getTetelek = async (req, res, next) => {
    const id = req.id;
    try {
        res.status(200).json(await kosartetelService.getTetelek(id));
    } catch (error) {
        next(error)
    }
}