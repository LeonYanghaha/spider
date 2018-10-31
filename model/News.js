const mongoose = require("mongoose"),
    Schema   = mongoose.Schema;

const newsSchema = new Schema({

    title:{type:String,default:""},
    date:{type:String},
    content:{type:String,default:""},

});

const News = module.exports  = mongoose.model('News', newsSchema);