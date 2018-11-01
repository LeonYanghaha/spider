const path           = require("path");
const child_process  = require("child_process");

(()=>{

    // 抓取新闻的子进程
    const filepath = path.join(__dirname,"jobTool.js");
    const jobHerf = child_process.fork(filepath);

    jobHerf.on("exit", (code)=> {
        console.log(`child process EXIT ! code:${code}`);
    });


    //从nsq 上获取新闻，并push 给 Elasticsearch
    const pushProcessPath = path.join(__dirname,"pushTool.js");
    const pushProcessHref= child_process.fork(pushProcessPath);
    pushProcessHref.on("exit", (code)=> {
        console.log(`pushProcessHref EXIT ! code:${code}`);
    });

})();