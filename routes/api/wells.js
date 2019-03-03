const express = require('express');
const Request = require("request");
const router = express.Router();


//Load well model
const Well = require('../../models/Wells');
const mailAPIKey = require('../../config/keys').mailAPIKey;
const mailApiURL = 'https://api.sendgrid.com/v3/mail/send';
var webHookResp = {
    "fulfillment_text":'web hook response',
    "fulfillment_messages" : [],
    "source" : '',
    "payload" : {},
    "output_contexts": [],
    "followup_event_input" : ''
};
var fullfillmentMsg = {
    "platform":"PLATFORM_UNSPECIFIED",
    "payload" : {}
};
// @route GET  /api/wells/well
// @desc  Get well by well details
// @access Public
router.post('/getWell', (req, res) => {
        console.log(req.body.queryResult.parameters);
        Well.find(req.body.queryResult.parameters).limit(10).then(well => {
            console.log(well);
            //fullfillmentMsg.payload = {"fields": well};
            //webHookResp.fulfillment_messages = [fullfillmentMsg];
            let response = {
                "fulfillmentMessages": [
                    {
                        "payload": {
                            "wells": well
                        }
                    }
                ],
            }
            res.json(response);
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


router.post('/email',(req,res) => {
    //console.log('APIKey: ' + mailAPIKey);
    Request.post({
        url: mailApiURL,
        headers: {
            'Content-Type': 'application/json',
            Authorization: mailAPIKey
        },
        body: JSON.stringify(req.body)
    },(error, response, body) => {
        if (error){
            console.log(error);
            res.json(error);
        }
        else {res.json(response)}
    })
})
module.exports = router;