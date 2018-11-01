const nsq  = require("nsqjs");
const conf  = require("../conf/main");

let w  = null ;
let isInit = false ;
let nsqTool = {};

nsqTool.pushMsg = (topic,msg)=>{

    if(!isInit){
        nsqTool.initWriter();
        return false ;
    }
    if(!topic || !msg){
        return false ;
    }
    w.publish(topic, msg);
    return true ;
};

nsqTool.initWriter = ()=>{
    if(isInit){
        return ;
    }
    w = new nsq.Writer(conf.nsq.writer.host, conf.nsq.writer.port);
    w.connect();

    w.on('ready', () => {
         isInit = true ;
    });

    w.on('closed', () => {
        isInit = false;
        console.log(`NSQ close...`);
    });

};


(async()=>{

    nsqTool.initWriter();

})();

module.exports = nsqTool;