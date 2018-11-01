const nsq   = require("nsqjs");
const conf  = require("../conf/main");
const elasticsearch = require('elasticsearch');

const pushTool = {};
let esClient = null ;

pushTool.init = async ()=>{

    await pushTool.initNSQ() ;
    await pushTool.initES() ;

};

pushTool.initNSQ = async ()=>{
    let nsqAddress = `${conf.nsq.reader.host}:${conf.nsq.reader.port}`;
    let topic = conf.nsq.topic ;
    let reader = new nsq.Reader(topic, 'test_channel',{
        lookupdHTTPAddresses: nsqAddress
    });
    reader.connect();
    reader.on('message', async (msg) => {
        console.log("recive msg");
        let isSuccess = await pushTool.msgToES(msg.body.toString());
        if(isSuccess){
            msg.finish();
        }else{
            // TODO   这里需要将保存出错的消息做其他处理
            msg.finish();
        }
    });
};

pushTool.initES =async ()=>{

    let esAddress = `${conf.es.host}:${conf.es.port}`;
    esClient = new elasticsearch.Client({
        host: esAddress,
        log: 'trace'
    });

    // create index


};

pushTool.msgToES = async(msgStr)=>{
    //
    // const { count } = await esClient.count({
    //     index: 'index'
    // });
    // console.error(count);
    // return true ;

    let newInfo = JSON.parse(msgStr);
    let index = conf.es.index ;
    let type = conf.es.type ;



    const response = await esClient.index({
        index: index,
        type: type,
        // id: '1',
        body: {
            title: newInfo.title,
            date: newInfo.date,
            content: newInfo.content,
        }
    });

    console.log(response);
    return true ;


};


(async()=>{

    pushTool.init();

})();