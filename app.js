require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Database
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jccmic2.mongodb.net/?retryWrites=true&w=majority`/*,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }*/)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('connexion à MongoDB échouée !')); 

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


module.exports = app;