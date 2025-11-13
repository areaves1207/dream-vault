const dreamsModel = require('../models/dreamsModel');

exports.getAllDreams = async (req, res) => {
    try{
        const dreams = await dreamsModel.getAllDreamsFromUser(req.user.id);
        res.json(dreams);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

exports.getDreamFromID = async (req, res) => {
    try{
        const dream = await dreamsModel.getDreamFromID(req.params.id); //dream id, not the user
        res.json(dream);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.addDream = async (req, res) =>{
    try{
        console.log("ID AND {BODY}:", req.user.id, req.body);
        if(req.user.id == null || req.body == null){
            throw Error(message="ID OR BODY IS NULL. CHECK YOUR JWT STATUS");
        }
        
        const newDream = await dreamsModel.addDream(req.user.id, req.body);
        console.log("Dream added:", newDream);
        res.status(201).json(newDream);
    }catch(err){
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

exports.editDream = async (req, res) => {
    try{
        const newDream = await dreamsModel.editDream(req.user.id, req.body);
        console.log("Dream edited:", newDream);
        res.status(201).json(newDream);
    }catch(err){
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

exports.deleteDream = async (req, res) => {
    try{
        const deletedDreamId = await dreamsModel.deleteDream(req.user.id, req.body);
        res.status(201).json({ message: "Dream removed", id: deletedDreamId });;
    }catch(err){
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}