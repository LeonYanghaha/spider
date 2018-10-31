const mongoose = require('mongoose');

module.exports = function (config){

    mongoose.connect(config.uri,config.options);

    return function *(next){
        this.mongoose = mongoose;

        yield next;
    }
};