const express = require('express');
const router = express.Router();
const reportesController = require('../controller/reportes');

router.get('/donaciones', reportesController.reporteDonaciones);
router.get('/donaciones-por-campana', reportesController.donacionesPorCampana);
router.get('/donaciones-live', reportesController.reporteDonacioneslive)

module.exports = router;
