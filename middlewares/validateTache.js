const joi = require('joi');

const schemaTache = joi.object({
    titre: joi.string()
        .required()
        .messages({
            'string.empty': 'Le champ titre est obligatoire',
            'eny.required': 'Le champ titre est obligatoire'
        }),
    
    description: joi.string()
        .required()
        .messages({
            'string.empty': 'Le champ descruption est obligatoire',
            'eny.required': 'Le champ descruption est obligatoire'
        }),
   
    status: joi.string()
        .valid('encours', 'terminée')
        .optional()
        .messages({
            'any.only': 'Le statut doit être soit "encours" soit "terminée"'
        }),
    
    dateEcheance: joi.date()
        .required()
        .greater('now')
        .messages({
            'date.empty': 'Le champ date est obligatoire',
            'eny.required': 'Le champ date est obligatoire',
            'date.base': 'Veuillez saisir une date valide',
            'date.greater': 'La date doit être postérieure à aujourd\'hui'
        })
});

module.exports = (req, res, next) => {
    const {error} = schemaTache.validate(req.body);
    if(error) return res.status(400).json({message: error.details[0].message});
    next();
};