require('dotenv').config;
require('./config/db');

const PORT = process.env.PORT;

const express = require('express');
const app = express();
const useRoutes = require('./routes/userRoutes');
const useTaches = require('./routes/tacheRoutes');
app.use(express.json());

app.use('/api', useRoutes);
app.use('/api', useTaches);


//------------LENCEMENT DU SERVEUR------------
app.listen(PORT, () =>{
    console.log(`Serveur lencé sur le http://localhost:${PORT}`)
})