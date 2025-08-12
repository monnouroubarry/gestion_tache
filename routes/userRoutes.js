const express = require('express');
const router = express.Router()
const userController = require('../controllers/userControllers');
const authorizeRole = require('../middlewares/authorizeRole');
const auth = require('../middlewares/authentification');
const validateUser = require('../middlewares/validateUser');

//signup
router.post('/ajouter-user', validateUser, userController.creatUser);

// Connexion
router.post('/login', userController.loginUser);

// Voir tous les utilisateurs (admin)
router.get('/voir-users', auth, authorizeRole('admin'), userController.getUsers);

// mise à jours de ses information ou par un admin
router.put('/update/:id', auth, validateUser, authorizeRole('user', 'admin'), userController.updateUser);

// Supréssion d'un utilisateur par lui-même ou par un admin
router.delete('/supprimer-user/:id', auth, authorizeRole('user', 'admin'), userController.deleteUser);


module.exports = router;