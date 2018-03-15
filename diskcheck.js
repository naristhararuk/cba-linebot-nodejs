var diskspace = require('diskspace');

var output = "";

function getDiskInfo() {
    
    let path = os.platform() === 'win32' ? 'C' : '/';
    diskspace.check(path,function (err, res){
        output = (res.total - res.free).toString() + "/" + res.total.toString() + " status:" + res.status.toString();
    }).end();
    return (output);
}
module.exports = getDiskInfo;