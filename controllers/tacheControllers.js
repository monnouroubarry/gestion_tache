const Tache = require('../models/Tache');

exports.addTache = async(req, res) =>{
    const {titre, description, status, priorite, dateEcheance} = req.body;
    try {
        const newTask = new Tache({
            titre,
            description,
            status,
            priorite,
            dateEcheance,
            createdBy: req.user.id
        });

        const tache = await newTask.save();
        if(!tache) return res.status(401).json({message: "Erreur lors de l'enregistrement de la tache"});
        res.status(201).json({message: "Tache enregistrée avec succès! ", tache});
    } catch(err) {
        res.status(500).json({message: "Erreur interne du serveur", erreur: err.message});
    }
};

//Modifier une tache par l'id
exports.updateTask = async(req, res) => {
    try{
        const tache = await Tache.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        ); 
        if(!tache) return res.status(400).json({message: "tache non trouvé"});
        res.status(200).json({message: "Tache mise à jour avec succès!", tache});
    }catch (err){
        res.status(400).json({message: "Erreur lors de la modification de la tache", erreur: err.message});
    }
};

//lister toutes les taches
exports.getTasks = async(req, res) =>{
    try{
        const taches = await Tache.find();
        if(!taches) return res.status(404).json({message: "Aucune tache trouvée"});
        res.status(200).json({message: "la liste des taches trouvées", taches});
    } catch(err){
        res.status(500).json({message: "Erreur du serveur", erreur: err.message});
    }
};

// lister toutes les taches avec pagination
exports.getTasksPagination = async (req, res) => {
    try{
        const {page = 1, limit = 5} = req.query;
        const taches = await Tache.find()
            .limit(Number(limit))
            .skip((Number(page) -1) * Number(limit));
        const total = await Tache.countDocuments();
        res.status(200).json({
            total,
            page: Number(page),
            totalePage: Math.ceil(total / limit),
            taches
        });
    }catch(err){
        res.status(500).json({message: "Erreur du serveur", erreur: err.message});
    }
};

// lister les taches avec filtre par status ou priorité
exports.getTasksFiltration = async (req, res) => {
    try{
        const {page = 1, limit = 5, status, priorite} = req.query;
        const filter = {};
        if(status) filter.status = status;
        if (priorite) filter.priorite = priorite;
        const taches = await Tache.find(filter)
            .limit(Number(limit))
            .skip((Number(page) -1) * Number(limit));

        const total = await Tache.countDocuments(filter);
        res.status(200).json({
            total,
            page: Number(page),
            totalePage: Math.ceil(total / limit),
            taches
        });
    }catch(err){
        res.status(500).json({message: "Erreur du serveur", erreur: err.message});
    }
};


//lister une tache par l'id
exports.getTask = async(req, res) =>{
    try{
        const task = await Tache.findById(req.params.id);
        if(!task) return res.status(401).json({message: "Tache non trouvée"});
        res.status(200).json({message: "La tache trouvée", task});
    }catch(err){
        res.status(500).json({message: "Erreur du server", erreur: err.message});
    }
}

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