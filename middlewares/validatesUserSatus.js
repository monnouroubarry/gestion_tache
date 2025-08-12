const joi = require('joi');

const validatSatus = joi.object({
    nom: joi.string(),
    prenom: joi.string(),
    email: joi.string(),
    role: joi.string()
        .valid('user')
        .messages({
            'any.only': 'Le role doit être user'
        }),
    password: joi.string()
});

module.exports = (req, res, next) => {
    const {error} = validatSatus.validate(req.body);
    if(error) return res.status(400).json({message: error.details[0].message});
    next();
};