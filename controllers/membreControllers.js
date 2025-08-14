const Membre = require('../models/Membre');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.addMember = async (req, res) => {
    try {
        const { nom, prenom, email, role, leaderId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(leaderId)) {
            return res.status(400).json({ message: "Format d'ID invalide" });
        }

        const existleader = await User.findById(leaderId);
        if (!existleader) {
            return res.status(404).json({ message: "Aucun utilisateur trouvé avec cet ID" });
        }

        if (existleader.role !== 'leader') {
            return res.status(400).json({ message: "L'utilisateur trouvé n'est pas un leader" });
        }

        const membre = new Membre({ nom, prenom, email, role, leaderId });
        await membre.save();

        res.status(201).json({ message: "Membre créé avec succès!", membre });

    } catch (err) {
        res.status(500).json({ message: "Erreur lors de l'ajout", erreur: err.message });
    }
};


//Fonction pour lister toutes membres
exports.getMembers = async(req, res) => {
    try{
        const requester = req.user;

        const {leaderId} = req.query;
        const filter = {};
        if(leaderId) filter.leaderId = leaderId;

        // if(requester.role === 'admin' || requester.role === 'leader' && requester.id === leaderId ){

            const membres = await Membre.find(filter);
            if(!membres) return res.status(400).json({message: "Aucun membre trouvé"});
            res.status(200).json({message: "Les membres trouvés", membres});
        // } else{
        //     res.status(409).json({message: "Vous ne pouvez voir quoi vos membres seulement"});
        // }
    } catch(err){
        res.status(500).json({message: "Erreur du serveur", erreur: err.message});
    }
};

//Fonction pour lister un membre par son Id
exports.getMember = async(req, res) => {
    try{
        // const target = req.params.id;
        // const requester = req.user;

        // const yesMembre = await Membre.findById(target);
        // if(!yesMembre) return res.status(404).json({message: "Membre non trouvé"}); 

        // if(requester.role === 'admin' || requester.role === 'leader' && yesMembre.leaderId.toString() === requester.id) {

            const membre = await Membre.findById(req.params.id);
            if(!membre) return res.status(404).json({message: "Membre non trouvé"});
            res.status(200).json({message: "Membre trouvée", membre});
       
        // } else{
        //     res.status(409).json({message: "Vous pouvez voir que les membres de ton équipe"});
        // }
    
    } catch(err){
        res.status(500).json({message: "Erreur du serveur", erreur: err.message});
    }
};

//Fonction pour supprimer un membre
exports.deleteMember = async(req, res) => {
    try{
        const target = req.params.id;
        const requester = req.user;
        const verifyMembre = await Membre.findById(target);
        if(!verifyMembre) return res.status(400).json({message: "Membre non trouvé"});

        if(requester.role === 'admin' || requester.role === 'leader' && verifyMembre.leaderId.toString() === requester.id){
            await Membre.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "Membre supprimé avec succès"});
        } else{
            res.status(409).json({message: "Vous ne pouvez que supprimer les membres de votre équipe"});
        }
    }catch(err){
        res.status(500).json({message: "Erreur lors de la suppréssion", erreur: err.message});
    }
};

// Fonction pour mettre à jour les informations d'un membre
exports.updateMember = async(req, res) => {
    try{
        const target = req.params.id;
        const requester = req.user;
        const verifyMembre = await Membre.findById(target);
        if(!verifyMembre) return res.status(404).json({message: "Membre non trouvé"});
        if(requester.role === 'admin' || requester.role === 'admin' && verifyMembre.leaderId.toString() === requester.id) {
            
            const membre = await Membre.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
            );
            res.status(200).json({message:"Mise à jour effectuée avec succès!", membre});
      
        } else{
            res.status(409).json({message: "Vous ne pouvez modifier que les informations des membres de votre équipe"})
        }
    } catch(err){
        res.status(500).json({message: "Erreur lors de la mise à jour", erreur: err.message});
    }
};