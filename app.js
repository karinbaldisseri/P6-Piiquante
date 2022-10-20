require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauce');

const app = express();


//Database connect
mongoose.connect(`${process.env.DB_CONNECTION_STRING}`)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.log('connexion à MongoDB échouée !', err)); 

// MIDDLEWARES

// Mettre à disposition le corps/body des requêtes de type Json
app.use(express.json());
// Sécurité CORS - permettre au front et au back (qui ont des origines différentes)
// de communiquer / définit comment les serveurs et navigateurs interagissent
// les headers permettent des requêtes cross-origin (et empêchent les erreurs CORS) 
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
}); 

//Routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use(serveStatic(path.join(__dirname, "public"))) ben Mrejen 20 1:30 ???

module.exports = app;