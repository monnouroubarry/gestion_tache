require('dotenv').config;
require('./config/db');

const PORT = process.env.PORT;

const express = require('express');
const app = express();
const useUser = require('./routes/userRoutes');
const useTaches = require('./routes/tacheRoutes');
const useMembre = require('./routes/membreRoutes');

// ------------- MIDDLEWARE GLOBAL--------------

app.use(express.json());
const logger = require('./middlewares/logger');
app.use(logger)

// -------------- ROUTES-----------------
app.use('/api', useUser);
app.use('/api', useTaches);
app.use('/api', useMembre);


// --------- MIDDLEWARES D'ERREUR-----------------
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

//------------LENCEMENT DU SERVEUR------------
app.listen(PORT, () =>{
    console.log(`Serveur lencé sur le http://localhost:${PORT}`)
})