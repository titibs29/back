const express = require('express');

const router = express.Router();

const stuffCtrl = require('../controllers/stuff')
const Thing = require('../models/thing');


// ajouter un truc dans la BD
router.post('/', stuffCtrl.createThing);

// afficher un seul objet
router.get('/:id', stuffCtrl.showOneThing);

// modifier un élément
router.put('/:id', stuffCtrl.modifyThing);

// supprimer un élément
router.delete('/:id', stuffCtrl.deleteThing);

// afficher la BD
router.get('/', stuffCtrl.showAllThings);

module.exports = router;