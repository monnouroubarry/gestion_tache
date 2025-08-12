const express = require('express');
const router = express.Router()
const userController = require('../controllers/userControllers');

//signup
router.post('/ajouter-user', userController.creatUser);

// Connexion
router.post('/login', userController.loginUser);

// Voir tous les utilisateurs (admin)
router.get('/voir-users', userController.getUsers);

// mise à jours de ses information ou par un admin
router.put('/update', userController.updateUser);


module.exports = router;