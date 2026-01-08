const express = require("express");

const router = express.Router();

const kategoriaController = require("../controllers/kategoriaController");

router.get("/", kategoriaController.getKategoriak);


module.exports = router;