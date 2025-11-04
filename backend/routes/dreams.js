const express = require('express');
const router = express.Router();
const dreamsController  = require('../controllers/dreamsController');

router.get('/', dreamsController.getAllDreams);
router.get('/:id', dreamsController.getDreamFromID);
router.post('/add_dream', dreamsController.addDream);

module.exports = router;