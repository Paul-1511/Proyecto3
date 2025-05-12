const express = require('express');
const router = express.Router();
const controller = require('../controller/usuarios');

router.get('/', controller.getAllUsuarios);
router.get('/:id', controller.getUsuariosById);

module.exports = router;
