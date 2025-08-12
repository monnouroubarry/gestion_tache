// middleware/authorizeRole.js
module.exports = function (...allowedRoles) {
  return function (req, res, next) {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès refusé : rôle non autorisé.' });
    }
    next();
  };
};