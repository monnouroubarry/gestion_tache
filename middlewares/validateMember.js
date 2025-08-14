const joi = require('joi');

const schemaMember = joi.object({
    nom: joi.string()
        .required()
        .messages({
            'string.empty': 'Le champ nom est obligatoire',
            'eny.required': 'Le champ nom est obligatoire'
        }),
    prenom: joi.string()
        .required()
        .messages({
            'string.empty': 'Le champ prenom est obligatoire',
            'eny.required': 'Le champ prenom est obligatoire'
        }),
    role: joi.string(),
    leaderId: joi.string()
        .required()
        .messages({
            'string.empty': 'Le champ leaderId est obligatoire'
        }),
});

module.exports = (req, res, next) => {
    const {error} = schemaMember.validate(req.body);
    if(error) return res.status(400).json({message: error.details[0].message});
    next();
};