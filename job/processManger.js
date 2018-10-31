const path           = require("path");
const child_process  = require("child_process");

(()=>{

    let filepath = path.join(__dirname,"jobTool.js");
    const jobHerf = child_process.fork(filepath);

    jobHerf.on("exit", (code)=> {

        console.log(`child process EXIT ! code:${code}`);
    });

})();