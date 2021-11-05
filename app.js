const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Thing = require('./models/thing');

const app = express();

// connexion à la BD
mongoose.connect('mongodb+srv://admin:admin@openclassroom-tutorial.3ibzi.mongodb.net/test?retryWrites=true&w=majority',
{
  useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('connexion à mongoDB réussie !'))
  .catch(() => console.log('connexion à mongoDB échouée !'));


// CORS
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

// ajouter un truc dans la BD
app.post('/api/stuff', (req,res,next) => {
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    thing.save()
    .then(() => res.status(201).json({
      message: 'Objet enregistré !'
    }))
    .catch(error => res.status(400).json({ error }));
});

// afficher un seul objet
app.get('/api/stuff/:id', (req,res,next) => {
    Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});

// modifier un élément
app.put('/api/stuff/:id', (req, res,next) => {
  Thing.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(400).json({ error }));
});

// supprimer un élément
app.delete('/api/stuff/:id', (req, res,next) => {
  Thing.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message: 'objet suppprimé !'}))
  .catch(error => res.statusMessage(400).json({ error }));
});

// afficher la BD
app.use('/api/stuff', (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;