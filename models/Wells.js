const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Schema
const wellSchema = new Schema({
    UWI : {type: String},
    "CurrentOperatorName": {type:String},
    "CurrentOperatorCity":{type:String},
    "LeaseName":{type: String},
    "WellNum":{type:String},
    "FieldName" : {type:String},
    "Country" : {type: String},
    "State": {type:String},
    "County":{type : String},
    "SurfaceLatitude": {type:String},
    "SurfaceLongitude": {type : String}

});

module.exports =Well= mongoose.model('wells',wellSchema);