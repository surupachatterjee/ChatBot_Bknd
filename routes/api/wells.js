const express = require('express');
const router = express.Router();


//Load well model
const Well = require('../../models/Wells');

// @route GET  /api/wells/well
// @desc  Get well by well details
// @access Public
router.get('/well', (req, res) => {
        console.log(req.body);
        Well.findOne(req.body).then(well => {
            console.log(well);
            res.json(well);
            }
        )
    }
);


router.post('/well',(req,res) => {
    console.log(req.body);
    const newWell = new Well({
        'WellNum': req.body.WellNum
    });
    newWell.save().then(well => {
        console.log(well);
        res.json(well);
    });

});






module.exports = router;