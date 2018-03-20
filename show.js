var os = require('os');
var diskspace = require('diskspace');
var osutils = require('os-utils');
var res1;
var res2;

var getCPUUsage = function(){
    return new Promise(function(resolve){
        osutils.cpuUsage(function (res){
            resolve(res.toFixed(2));
        });
    });
}

let path = os.platform() === 'win32' ? 'C' : '/'; 
var getdiskinfo = function(){
    return new Promise(function(resolve){
        diskspace.check(path,function(err,result){
            resolve(result.used + "/" +result.total);
        });
    });
}
// var diskinfo ;
var startcheckdisk = async function(){
    var diskinfo = "" + await getdiskinfo();
    //console.log("show " + diskinfo)
    return diskinfo;
}

var startcheckcpu = async function(){
    var cpuuse = "" + await getCPUUsage();
    //console.log("cpu usage % " + cpuuse)
    return cpuuse;
}
//startcheck();

try{
    
    var result1 =  startcheckdisk()
    var result2 =  getCPUUsage()
    
    
    result1.then(function (result1){ res1 = result1; });
    result2.then(function (result2){ res2 = result2;
        console.log("show result2 in " +res2);
        return res2.toString();
    });
    console.log("show result1 " +res1);
    console.log("show result2 " +res2);

}
catch (err){
    console.log(err);
}