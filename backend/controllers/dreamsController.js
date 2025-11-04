const dreamsModel = require('../models/dreamsModel');

exports.getAllDreams = async (req, res) => {
    try{
        const dreams = await dreamsModel.getAll();
        res.json(dreams);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};