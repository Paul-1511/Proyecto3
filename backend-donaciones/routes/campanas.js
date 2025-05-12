const express = require('express');
const router = express.Router();
const controller = require('../controller/campanas');

router.get('/', controller.getAllCampanas);
router.get('/:id', controller.getCampanaById);
router.post('/', controller.createCampana);
router.put('/:id', controller.updateCampana);
router.delete('/:id', controller.deleteCampana);

module.exports = router;
