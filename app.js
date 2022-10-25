require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauce');
const limiter = require('./middleware/rate-limiter');

const app = express();


//DATABASE CONNECTION with environment variable
mongoose.connect(`${process.env.DB_CONNECTION_STRING}`)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.log('connexion à MongoDB échouée !', err)); 
    

// MIDDLEWARES

// Express.json - Parses incoming JSON requests and puts the parsed data in req.body. (instead of Body-parse)
app.use(express.json());
// Helmet security - Express.js security with HTTP headers
app.use(helmet());
// Express-rate-limit - Protects from brute force type attacks 
app.use(limiter);
// Mongo-sanitize - Helps against query selector injections
app.use(mongoSanitize());
// Sécurité CORS (Cross-origin resource sharing) -  Prevents from Cors attacks
app.use(cors());
// add specific headers to allow controlled acces between different origins / servers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}); 


// ROUTES
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


// EXPORTS
module.exports = app;