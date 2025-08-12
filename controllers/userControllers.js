require('dotenv').config
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

// Inscription d'un utilisateur
exports.creatUser = async(req, res) =>{
    const {nom, prenom, email, role,password} = req.body;
    try{
        const exist = await User.findOne({email});
        if(exist) return res.status(404).json({message: "L'email est déjà utilisé"});
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            nom,
            prenom,
            email,
            role,
            password: hashedPassword
        });
        const user = await newUser.save();
        res.status(201).json({message: "Utilisateur créé avec succès", user});
    } catch(err){
        res.status(500).json({message: "Erreur lors de la création de l'utilisateur", erreur: err.message});
    }
};

// Connexion à un compte qui existe déjà
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        //  Chercher l'utilisateur (avec await)
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        //  Vérifier le mot de passe
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        //  Générer le token
        const token = jwt.sign(
            { email: user.email, role: user.role, id: user._id },
            process.env.JWT_SECRET, // utilise la clé du .env
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );

        // Répondre au client
        res.status(200).json({ message: "Connexion réussie", token });

    } catch (err) {
        console.error("Erreur login :", err);
        res.status(500).json({ message: "Erreur interne du serveur", erreur: err.message });
    }
};

//Fonction pour voir tous les utilisateurs (admin)
exports.getUsers = async(req, res) => {
    try{
        const users = await User.find();
        if(!users) return res.status(404).json({message: "Aucun utilisateur trouvé"});
        res.status(200).json({message: "Liste des utilisateurs trouvées", users});
    } catch(err){
        res.status(500).json({message: "Erreur interne du serveur", erreur: err.message});
    }
};

// Fonction pour mettre à jour les utilisateur
exports.updateUser = async(req, res)  => {
    const targetId = req.params.id;
    const requester = req.user;

    const exist = await User.findById(targetId);
    if(!exist) return res.status(400).json({message: "Aucun utilisateur trouvé"});

    if( targetId === requester.id || exist.role === 'user' && requester.role === 'admin'){
        try{
            const update = req.body;
            if(update.password) {
                update.password = await bcrypt.hash(update.password, 10);
            }

            const user = await User.findByIdAndUpdate(
                targetId,
                update,
                req.user.id,
                {new: true, runValidators: true}
            );
            if(!user) return res.status(400).json({message: "Aucun utlisateur touvé"});
            res.status(200).json({message: "Utilisateur modifié avec succès", user});
    }catch(err){
        res.status(500).json({message: "Erreur du serveur", erreur: err.message});
    }
    } else{
        res.status(404).json({message: "Vous n'avez pas le droit d'executer cette tache"})
    }
};

// Suppréssion d'un utilisateur par un admin ou par soi-même
exports.deleteUser = async(req, res) =>{
    const targetId = req.params.id;
    const requester = req.user;

    const exist = await User.findById(targetId);
    if(!exist) return res.status(404).json({message: "Aucun utilisateur trouvé"});

    if(targetId === requester.id || exist.role === 'user' && requester.role === 'admin'){
        try{
            await User.findByIdAndDelete(targetId);
            res.status(200).json({message: "Utilisateur supprimé avec succès"});
        }catch(err){
            res.status(500).json({message: "Erreur du serveur", erreur: err.message});
        }
    } else {
        res.status(404).json({message: "Vous n'avez pas le droit d'éxecuté cette tache!"});
    }
};