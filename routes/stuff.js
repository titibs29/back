const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const stuffCtrl = require('../controllers/stuff');


// ajouter un truc dans la BD
router.post('/', auth, stuffCtrl.createThing);

// afficher un seul objet
router.get('/:id', auth, stuffCtrl.showOneThing);

// modifier un élément
router.put('/:id', auth, stuffCtrl.modifyThing);

// supprimer un élément
router.delete('/:id', auth, stuffCtrl.deleteThing);

// afficher la BD
router.get('/', auth, stuffCtrl.showAllThings);

module.exports = router;