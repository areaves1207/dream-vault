const dreamsModel = require('../models/dreamsModel');

exports.getAllDreams = async (req, res) => {
    try{
        const dreams = await dreamsModel.getAll();
        res.json(dreams);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

exports.getDreamFromID = async (req, res) => {
    try{
        const dream = await dreamsModel.getDreamFromID(req.params.id);
        res.json(dream);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.addDream = async (req, res) =>{
    try{
        const newDream = await dreamsModel.addDream(req.body);
        res.status(201).json(newDream);
        console.log("Dream added:", newDream);
    }catch(err){
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

exports.editDream = async (req, res) => {
    try{
        const newDream = await dreamsModel.editDream(req.body);
        res.status(201).json(newDream);
        console.log("Dream edited:", newDream);
    }catch(err){
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

exports.deleteDream = async (req, res) => {
    try{
        const deletedDreamId = await dreamsModel.deleteDream(req.body);
        res.status(201);
        console.log("Dream removed: ", deletedDreamId);
    }catch(err){
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}