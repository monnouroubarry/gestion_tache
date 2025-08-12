const tacheController = require('../controllers/tacheControllers');
const express = require('express');
const router = express.Router();

router.post('/ajouter-tache', tacheController.addTache);

module.exports = router;