const express = require("express");

const router = express.Router();

const termekController = require("../controllers/termekController");

router.get("/",  termekController.getTermekek);
router.post("/", termekController.postTermek);
router.param("termek_id", (req, res, next, termek_id) => 
{
    req.termek_id = termek_id;
    next();
});


router.param("kosar_id", (req,res,next,kosar_id) =>{
    req.kosar_id = kosar_id;
    next();
})
router.get("/kosar/:kosar_id", termekController.getTermekekBykosar_id)

router.get("/:termek_id", termekController.getTermek);

router.delete("/:termek_id", termekController.deleteTermek);
router.put("/:termek_id", termekController.editTermek);
module.exports = router;