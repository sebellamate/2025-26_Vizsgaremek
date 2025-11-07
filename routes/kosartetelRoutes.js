const express = require("express");

const router = express.Router();

const kosartetelController = require("../controllers/kosartetelController");



router.post("/", kosartetelController.postTetel);

router.param("id", (req, res, next, id) => 
{
    req.id = id;

    next();
});

router.get("/:id", kosartetelController.getTetel);
router.get("/osszes/:id", kosartetelController.getTetelek);

module.exports = router;