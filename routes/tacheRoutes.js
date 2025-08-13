const tacheController = require('../controllers/tacheControllers');
const auth = require('../middlewares/authentification');
const express = require('express');
const router = express.Router();
const validateTache = require('../middlewares/validateTache');

// route pour ajouter une tache
router.post('/ajouter-tache', auth,  validateTache, tacheController.addTache);

// route pour afficher toutes les taches
router.get('/voir-taches', tacheController.getTasks);

// route pour afficher toutes les taches par pagination
router.get('/voir-taches/pagination', tacheController.getTasksPagination);

// route pour afficher toutes les taches par statut
router.get('/voir-taches/filtre', tacheController.getTasksPageFiltre);

//route pour afficher une tache par son id
router.get('/voir-tache/:id', tacheController.getTask);

//route pour supprimer une tache par son id
router.delete('/supprimer-tache/:id', auth, tacheController.deleteTask);

//route pour mettre à jour une tache
router.put('/modifier-tache/:id', auth, tacheController.updateTask);

module.exports = router;