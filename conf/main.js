const conf = {

    port:7022,
    serverName:'spider',
    baseUrl:"http://news.ifeng.com/listpage/70645/1/list.shtml",
    mongodbUrl:"mongodb://127.0.0.1:27017/spider",
    nsq:{
        topic:"spider",
        reader:{
            host:"127.0.0.1",
            port:4161,
        },
        writer:{
            host:"127.0.0.1",
            port:4150,
        }
    },
    es:{
        index:"spider",
        type:"news",
        host:"127.0.0.1",
        port:"9200"

    }
};

module.exports = conf;