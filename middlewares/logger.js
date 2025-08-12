// middlewares/logger.js

const logger = (req, res, next) => {
  const date = new Date().toISOString();
  console.log(`[${date}] ${req.method} ${req.originalUrl}`);
  next(); // passe au middleware ou route suivante
};

module.exports = logger;
