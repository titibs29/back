const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Product = require('./models/product');
const product = require('./models/product');

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
app.post('/api/products', (req,res,next) => {
    delete req.body._id;
    const product = new Product({
      ...req.body
    });
    product.save()
    .then(() => res.status(201).json({
      product
    }))
    .catch(error => res.status(400).json({ error }));
});

// afficher un seul objet
app.get('/api/products/:id', (req,res,next) => {
    Product.findOne({ _id: req.params.id })
    .then(product => res.status(200).json({product: product}))
    .catch(error => res.status(404).json({ error }));
});

// modifier un élément
app.put('/api/products/:id', (req, res,next) => {
  Product.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Modified!' }))
  .catch(error => res.status(400).json({ error }));
});

// supprimer un élément
app.delete('/api/products/:id', (req, res,next) => {
  Product.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Deleted!' }))
  .catch(error => res.statusMessage(400).json({ error }));
});

// afficher la BD
app.use('/api/products', (req, res, next) => {
    Product.find()
    .then(products => res.status(200).json({ products: products}))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;