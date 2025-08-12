const joi = require('joi');

const schemaUser = joi.object({
    nom: joi.string()
        .required()
        .max(20)
        .messages({
            'string.empty': 'Le champ nom est obligatoire',
            'string.max': 'Le champ nom ne peut pas dépasser plus de 20 caractères',
            'eny.required': 'Le champ nom est obligatoire'
        }),
    prenom: joi.string()
        .required()
        .max(30)
        .messages({
            'string.empty': 'Le champ prenom est obligatoire',
            'string.max': 'Le champ prenom ne peut pas dépasser plus de 20 caractères',
            'eny.required': 'Le champ prenom est obligatoire'
        }),
    email : joi.string()
        .required()
        .email()
        .messages({
            'string.empty': 'Le champ email est obligatoire',
            'eny.required': 'Le champ email est obligatioire',
            'string.email': 'Veuillez saisir un email valide'
        }),
    password: joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
    .required()
    .messages({
      'string.empty': 'Le mot de passe est requis.',
      'string.pattern.base': 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.'
    })
});

module.exports = (req, res, next) => {
    const {error} = schemaUser.validate(req.body);
    if(error) return res.status(400).json({message: error.details[0].message});
    next();
};