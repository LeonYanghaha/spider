const cheerio = require("cheerio");
const got     = require("got");
const conf    = require("../conf/main");
const newsTool= require("./newsTool");
const mongoose= require("../middlewares/mongoose");
const jobTool = {};

jobTool.getNewsDetails = (html)=>{
    const $ = cheerio.load(html);
    let title = $('#artical_topic').html();
    let time = $('.p_time span').eq(0).html();
    let content = $("#main_content").html();

    return [jobTool.unicode(title).trim(),jobTool.unicode(time).trim(),jobTool.unicode(content).trim()];

};

jobTool.getNewsList = (html)=>{
    let newList = [] ;
    const $ = cheerio.load(html);
    let list = $(".box_list h2 a");
    for(let i = 0 ; i < list.length ; i++){
        let tempNode = list[i];
        newList.push(tempNode.attribs);
    }
    return newList ;
};

jobTool.unicode = (str)=>{

    if(!str){
        return "";
    }
    let temp = unescape(str.replace(/\\u/g,"%u"));
    temp = temp.replace(/&#(x)?(\w+);/g,function($,$1,$2){
        return String.fromCharCode(parseInt($2,$1?16:10));
    });
    return temp;
};

jobTool.getHTML = async(url)=>{
    let res = -1;
    try {
        const response = await got(url);
        res = response.body ;
    } catch (error) {
        console.log(error.response.body);
    }
    return res;
};


jobTool.main = async()=>{

    console.log(`job start ${new Date().toLocaleString()}`);

    let url = conf.baseUrl || "http://news.ifeng.com/listpage/70645/1/list.shtml";
    let htmlStr  = await jobTool.getHTML(url);
    // console.log(htmlStr);
    if(htmlStr == -1){
        return false ;
    }

    let newList = jobTool.getNewsList(htmlStr);
    // console.log(newList);
    if(!newList || newList.length<1){
        return false ;
    }

    for(let i =0 ; i < newList.length ; i++){
        let tempSignNew = newList[i];
        let signNewHtml = await jobTool.getHTML(tempSignNew.href);
        let signNewInfo = jobTool.getNewsDetails(signNewHtml);
        await newsTool.save(signNewInfo);
        // console.log(signNewInfo);
    }
};


jobTool.init = async()=>{

    let jobSpace = 1000 ;
    await jobTool.main();
    // console.log(`${new Date().toLocaleString()}.....`);
    setTimeout(jobTool.init,jobSpace);

};


(async()=>{
    mongoose({
            "uri":conf.mongodbUrl,
            "options":{
                "useNewUrlParser":true
            }
        }
    );
    await jobTool.init();

})();


