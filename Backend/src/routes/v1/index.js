const express = require('express');

const authRoutes = require('./authRoutes');
const recepieRoutes = require('./recepieRoutes');
const reviewRoutes = require('./reviewRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/recipes', recepieRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;