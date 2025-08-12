function errorHandler(err, req, res, next) {
  console.error(err.stack); // Affiche la stack trace dans la console (utile en dev)

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erreur interne du serveur';

  res.status(statusCode).json({
    success: false,
    message: message,
    // En dev, tu peux aussi envoyer la stack pour déboguer :
    // stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
}

module.exports = errorHandler;