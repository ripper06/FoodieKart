const express = require('express');

const authRoutes = require('./authRoutes');
const recepieRoutes = require('./recepieRoutes')

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/recepies', recepieRoutes);

module.exports = router;