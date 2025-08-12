const mongoose = require('mongoose');
require('dotenv').config(); // pour charger les variables .env

const MONGO_URI = process.env.MONGO_URI;
const MONGODB_URI  = process.env.MONGODB_URI;


mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connexion à MongoDB réussie.');
})
.catch((err) => {
  console.error('❌ Erreur de connexion à MongoDB :', err.message);
  process.exit(1);
});