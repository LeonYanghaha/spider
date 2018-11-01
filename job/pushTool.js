const nsq   = require("nsqjs");
const conf  = require("../conf/main");

const pushTool = {};

pushTool.init = ()=>{

    let nsqAddress = `${conf.nsq.reader.host}:${conf.nsq.reader.port}`;
    let topic = conf.nsq.topic ;
    let reader = new nsq.Reader(topic, 'test_channel',{
        lookupdHTTPAddresses: nsqAddress
    });
    reader.connect();
    reader.on('message', async (msg) => {
        let isSuccess = await pushTool.main(msg.body.toString());
        if(isSuccess){
            msg.finish();
        }else{
            // TODO   这里需要将保存出错的消息做其他处理
            msg.finish();
        }
    });
};


pushTool.main = async(msg)=>{



};

(async()=>{

    pushTool.init();

})();