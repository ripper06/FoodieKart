const express = require("express");
const { RecepieController } = require("../../controllers");
const { authMiddleware } = require("../../middlewares");

const router = express.Router();

router.get("/",
    authMiddleware.protect,
    RecepieController.getRecipes
);

module.exports = router;