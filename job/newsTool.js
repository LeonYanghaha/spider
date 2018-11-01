const News    = require("../model/News");
const nsqTool = require("./nsqTool");
const conf     = require("../conf/main");
const newsTool = {};

newsTool.save = async(signNewInfo)=>{

    let isSave = await newsTool.isSave(signNewInfo);
    if(!isSave){
        return false ;
    }
    console.log(`save news  title:${signNewInfo[0]}`);
    let news = new News({
        title:signNewInfo[0],
        date:signNewInfo[1],
        content:signNewInfo[2],
    });

    await news.save();
    // 将保存的新闻推给队列
    newsTool.newsPushNSQ(JSON.stringify(news));
};
newsTool.newsPushNSQ = (newsStr)=>{
    // console.log(newsStr);
    let topic = conf.nsq.topic ;
    let isPush = nsqTool.pushMsg(topic,newsStr);
    if(isPush){
        console.log(`保存成功...`);
    }else{
        console.log(`保存失败..`);
        // TODO  这里应该有一个保存失败的预警机制
    }
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