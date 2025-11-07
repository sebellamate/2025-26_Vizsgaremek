const express = require("express");

const router = express.Router();

const cartController = require("../controllers/cartController");


router.param("user_id", (req,res,next,user_id)=>{
    req.user_id = user_id;
    next();
})
router.get("/:user_id", cartController.getCart);



module.exports = router;