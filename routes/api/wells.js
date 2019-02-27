const express = require('express');
const router = express.Router();


//Load well model
const Well = require('../../models/Wells');
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
        Well.findOne(req.body.queryResult.parameters).then(well => {
            console.log(well);
            //fullfillmentMsg.payload = {"fields": well};
            //webHookResp.fulfillment_messages = [fullfillmentMsg];
            let response = {
                "fulfillmentMessages": [
                    {
                        "payload": {
                            "well": {
                                "County": well.County,
                                "State": well.State,
                                "SurfaceLongitude": well.SurfaceLongitude,
                                "WellNum": well.WellNum,
                                "FieldName": well.FieldName,
                                "Country": well.Country,
                                "LeaseName": well.LeaseName,
                                "SurfaceLatitude": well.SurfaceLatitude,
                                "CurrentOperatorName": well.CurrentOperatorName,
                                "CurrentOperatorCity": well.CurrentOperatorCity
                            }
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







module.exports = router;