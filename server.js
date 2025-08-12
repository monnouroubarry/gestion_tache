require('dotenv').config;
require('./config/db');

const PORT = process.env.PORT;

const express = require('express');
const app = express();
const useRoutes = require('./routes/userRoutes');
const useTaches = require('./routes/tacheRoutes');

// ------------- MIDDLEWARE GLOBAL--------------

const logger = require('./middlewares/logger');
app.use(logger)
app.use(express.json());

// -------------- ROUTES-----------------
app.use('/api', useRoutes);
app.use('/api', useTaches);


// --------- MIDDLEWARES D'ERREUR-----------------
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

//------------LENCEMENT DU SERVEUR------------
app.listen(PORT, () =>{
    console.log(`Serveur lencé sur le http://localhost:${PORT}`)
})