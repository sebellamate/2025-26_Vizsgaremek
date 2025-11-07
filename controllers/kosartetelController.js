const db = require("../db/index")
const { kosartetelService } = require("../services/index")(db); 
exports.postTetel = async (req,res,next) => {
    const {kosar_id, termek_id, mennyiseg} = req.body;
    res.status(200).json(await kosartetelService.postTetel({kosar_id, termek_id, mennyiseg}))
}
exports.getTetel = async (req,res,next) => {
    const id = req.id;
    res.status(200).json(await kosartetelService.getTetel(id));
}
exports.getTetelek = async (req,res,next) => {
    const id = req.id;
    res.status(200).json(await kosartetelService.getTetelek(id));
}