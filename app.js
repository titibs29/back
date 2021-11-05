const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const stuffRoutes = require('./routes/stuff');

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

app.use('/api/stuff', stuffRoutes);

module.exports = app;