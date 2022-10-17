require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user');

const app = express();


//Database connect
mongoose.connect(`${process.env.DB_CONNECTION_STRING}`)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('connexion à MongoDB échouée !')); 

// Middlewares
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
}); 

//Routes
app.use('/api/auth', userRoutes);

module.exports = app;