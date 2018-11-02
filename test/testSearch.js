const conf          = require("../conf/main");
const elasticsearch = require('elasticsearch');

let isInit = false ;
const esTool = {};
let esClient = null ;

esTool.search = async(kw)=>{

    // const response = await esClient.search({
    //     index: conf.es.index,
    //     q: 'title:'+kw
    // });
    // console.log(response);



    const response = await esClient.search({
        index: conf.es.index,
        body: {
            query: {
                match: {
                    title: kw
                }}
            // },
            // facets: {
            //     tags: {
            //         terms: {
            //             field: 'tags'
            //         }
            //     }
            // }
        }
    });





    return response || "none"
};

esTool.init = ()=>{
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

    esTool.init();
    let res = await esTool.search("北京123");
    for(let i = 0 ; i < res.hits.total;i++){
        console.log(JSON.stringify(res.hits.hits[i]));
    }

})();

