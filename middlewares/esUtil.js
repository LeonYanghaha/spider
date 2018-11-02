const conf          = require("../conf/main");
const elasticsearch = require('elasticsearch');

let esClient = null ;
let isInit = false ;
const esUtil = {};

esUtil.search = async(kw)=>{
    // const response = await esClient.search({
    //     index: conf.es.index,
    //     body: {
    //         query: {
    //             match: {
    //                 title: kw
    //             }}
    //         // },
    //         // facets: {
    //         //     tags: {
    //         //         terms: {
    //         //             field: 'tags'
    //         //         }
    //         //     }
    //         // }
    //     }
    // });

    const response = await esClient.search({
        index: conf.es.index,
        q: 'title:'+kw
    });
    return response || "none"
};

esUtil.init = ()=>{
    if(isInit){
        return ;
    }
    let esAddress = `${conf.es.host}:${conf.es.port}`;
    esClient = new elasticsearch.Client({
        host: esAddress
        // log: 'trace'
    });
    isInit = true ;
};



(async()=>{

    esUtil.init();

})();


module.exports = esUtil;