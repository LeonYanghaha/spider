const News  = require("../model/News");
const newsTool = {};

newsTool.save = async(signNewInfo)=>{

    let isSave = await newsTool.isSave(signNewInfo);
    if(!isSave){
        return false ;
    }

    let news = new News({
        title:signNewInfo[0],
        date:signNewInfo[1],
        content:signNewInfo[2],
    });

    await news.save();
};

newsTool.isSave = async(signNewInfo)=>{

    if(!signNewInfo || signNewInfo.length!=3){
        return false ;
    }
    let tempNews = await News.findOne({title:signNewInfo[0]}).exec();

    if(tempNews){
        return false ;
    }
    return true ;
};

module.exports = newsTool;