const Tache = require('../models/Tache');

exports.addTache = async(req, res) =>{
    const {titre, description, status, dateEcheance} = req.body;
    try {
        const newTask = new Tache({
            titre,
            description,
            status,
            dateEcheance,
            createdBy: req.user.id
        });

        const taskSave = await newTask.save();
        if(!taskSave) return res.status(401).json({message: "Erreur lors de l'enregistrement de la tache"});
        res.status(201).json({message: "Tache enregistrée avec succès! ", taskSave});
    } catch(err) {
        res.status(500).json({message: "Erreur interne du serveur", erreur: err.message});
    }
};

//lister toutes les taches
exports.getTasks = async(req, res) =>{
    try{
        const tasks = await Tache.find();
        if(!tasks) return res.status(404).json({message: "Aucune tache trouvée"});
        res.status(200).json({message: "la liste des taches trouvées", tasks});
    } catch(err){
        res.status(500).json({message: "Erreur du serveur", erreur: err.message});
    }
};

//Supprimer une tache par id
exports.deleteTask = async(req, res) =>{
    try{
        const user = await Tache.findByIdAndDelete(req.params.id);
        if(!user) return res.status(404).json({message: "Aucune tache touvée"});

        res.status(200).json({message: "Tache supprimée avec succès"});
    }catch(err){
        res.status(500).json({message: "Erreur du serveur", erreur: err.message});
    }
};