const express = require('express');
const router = express.Router()
const userController = require('../controllers/userControllers');
const authorizeRole = require('../middlewares/authorizeRole');
const auth = require('../middlewares/authentification');
const validateUser = require('../middlewares/validateUser');
const validateRole = require('../middlewares/validatesUserSatus');

//signup
router.post('/signup', validateUser, validateRole, userController.creatUser);

// Connexion
router.post('/login',  userController.loginUser);

// Voir tous les utilisateurs (admin)
router.get('/voir-users', userController.getUsers);

//Voir un utlisateur par son id: 
router.get('/voir-user/:id', userController.getUser);

// mise à jours de ses information ou par un admin
router.put('/update/:id', auth, authorizeRole('user', 'admin'), userController.updateUser);

// Supréssion d'un utilisateur par lui-même ou par un admin
router.delete('/supprimer-user/:id', auth, authorizeRole('admin'),  userController.deleteUser);


module.exports = router;