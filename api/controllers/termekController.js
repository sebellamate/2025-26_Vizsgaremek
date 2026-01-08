const db = require("../db")

const { termekService } = require("../services")(db)

exports.getTermekek = async (req,res,next) => {
    try {
        res.status(200).json(await termekService.getTermekek());
    } catch (error) {
        next(error);
    }

}
exports.postTermek = async (req,res,next) =>{
    const { nev, leiras, ar, kep_url, kategoria_id } = req.body || {};
    try {
        res.status(200).json(await termekService.postTermek({nev, leiras, ar, kep_url, kategoria_id}));
    } catch (error) {
        next(error);
    }
}
exports.getTermek = async (req, res, next) => {
    const termek_id = req.termek_id
    try {
        res.status(200).json(await termekService.getTermek(termek_id));
    } catch (error) {
        next(error);
    }
}
exports.deleteTermek = async (req,res,next) => {
    const termek_id = req.termek_id
    try {
        res.status(200).json(await termekService.deleteTermek(termek_id));
    } catch (error) {
        next(error);
    }
}
exports.editTermek = async (req,res,next) => {
    const termek_id = req.termek_id
    const { nev, leiras, ar, kep_url, kategoria_id } = req.body || {};
    try {
        res.status(200).json(await termekService.editTermek(termek_id, {nev, leiras, ar, kep_url, kategoria_id}));
    } catch (error) {
        next(error);
    }
}
exports.getTermekekBykosar_id = async (req,res,next) => {
    const kosar_id = req.kosar_id;
    try {
        res.status(200).json(await termekService.getTermekekBykosar_id(kosar_id));
    } catch (error) {
        next(error);
    }
}
