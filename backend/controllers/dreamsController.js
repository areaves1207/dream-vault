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
        // console.log(req.params.id);

    }catch(err){
        res.status(500).json({ error: err.message });
    }
}