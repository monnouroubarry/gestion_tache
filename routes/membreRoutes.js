const express = require('express');
const router = express.Router();
const membreController = require('../controllers/membreControllers');
const auth = require('../middlewares/authentification');
const authorizeRole = require('../middlewares/authorizeRole');

router.post('/ajouter-membre', auth, authorizeRole('admin'), membreController.addMember);

router.get('/voir-membres',  membreController.getMembers);

router.get('/voir-membre/:id', membreController.getMember);

router.put('/modifier-membre/:id', auth, authorizeRole('leader', 'admin'), membreController.updateMember);

router.delete('/supprimer-membre/:id', auth, authorizeRole('leader', 'admin'), membreController.deleteMember);

module.exports = router;