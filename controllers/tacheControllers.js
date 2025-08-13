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

        const taches = await Tache.find(filter)
            .limit(Number(limit))
            .skip((Number(page) -1) * Number(limit));

        const total = await Tache.countDocuments(filter);
        res.status(200).json({
            message: `Liste des taches '${status}'`,
            total,
            page: Number(page),
            totalePage: Math.ceil(total / limit),
            taches
        });
    }catch(err){
        res.status(500).json({message: "Erreur du serveur", erreur: err.message});
    }
};

exports.getTasksPageFiltre = async (req, res) => {
  try {
    const { page = 1, limit = 5, status, priorite } = req.query;

    // On construit le filtre dynamiquement avec insensibilité aux accents et casse
    let filter = {};
    if (status) {
      filter.status = { $regex: `^${status}$`, $options: "i" }; // i = ignore case
    }
    if (priorite) {
      filter.priorite = { $regex: `^${priorite}$`, $options: "i" };
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 5;

    const taches = await Tache.find(filter)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .collation({ locale: "fr", strength: 1 }); // gère accents et casse

    const total = await Tache.countDocuments(filter).collation({ locale: "fr", strength: 1 });

    res.status(200).json({
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      taches
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur du serveur", erreur: err.message });
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