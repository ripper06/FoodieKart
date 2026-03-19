const { ReviewController } = require('../../controllers');
const { authMiddleware } = require('../../middlewares');

const express = require('express');

const router = express.Router();

router.post('/',
    authMiddleware.protect,
    ReviewController.addReviews
)

router.get('/:recipeId',
    authMiddleware.protect,
    ReviewController.getReviews
);

router.get('/', ReviewController.getAllReviews);

module.exports = router;