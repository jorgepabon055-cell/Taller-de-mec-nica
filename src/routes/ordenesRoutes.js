const express = require('express');
const router = express.Router();
const ordenesController = require('../controllers/ordenesControllers');

router.get('/', ordenesController.getOrdenes);
// IMPORTANTE: Pon esta línea ANTES de /:id para que Express no confunda "mecanicos" con un ID
router.get('/mecanicos', ordenesController.getMecanicos); 

router.get('/:id', ordenesController.getOrdenById);
router.post('/', ordenesController.createOrden);
router.put('/:id', ordenesController.updateOrden);
router.delete('/:id', ordenesController.deleteOrden);

module.exports = router;
