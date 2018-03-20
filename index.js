var express = require('express');
var line = require('@line/bot-sdk');
var os = require('os');
var diskspace = require('diskspace');
var osutils = require('os-utils');
var app = express();

var getCPUUsage = function(){
    return new Promise(function(resolve){
        osutils.cpuUsage(function (res){
            resolve(res);
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

app.set('port',(process.env.PORT || 5000 || 80));

const config = {
    channelAccessToken : "TdqdtCrLMAyH0DRvDsJEa0cZkUAoDGRROJilbToDmod3nSj2wpg54wqNqCajrD+EoKagcL6Ou32MVyLdsWQf2njd/asEoKwUrTrzwk4gJM2psUewHffRRjT/bbhd0gZoEDLh+RnGlbGgl/V7EtpmuAdB04t89/1O/w1cDnyilFU=",
    channelSecret : "42f6cd974e200b9a67886cd98893f354"
};
const client = new line.Client(config);

//root url
app.get('/',function (req,res){
    res.send('Hello World')
});
app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch(errhandler);
});

function handleEvent(event) {

    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

function handleMessageEvent(event) {
    try{
    var msg = {
        type: 'text',
        text: 'สวัสดีครับนี่เป็นระบบตอบกลับอัตโนมัติจาก CBA'
    };
    var eventText = event.message.text.toLowerCase();

    if (eventText === 'system') {

        //var systeminfo = ""+ getCPUInfo()  + "\r\n"+ cpuusage + "\r\n" + diskinfo;
        var systeminfo = ""+ getCPUInfo()  ;
        msg = {
            type: 'text',
            text: os.platform() + systeminfo 
        
        }
    } else if (eventText === 'disk') {
        var result =  startcheckdisk()
        result.then(function (res){ 
            return msg = {
                type: 'text',
                text: res 
            }
        });
    } else if (eventText === 'cpu usage') {
        var result =  startcheckcpu()
        result.then(function (res){ 
            return msg = {
                type: 'text',
                text: res 
            }
        });
    } else if (eventText === 'image') {
        msg = {
            'type': 'image',
            'originalContentUrl': 'https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100',
            'previewImageUrl': 'https://images.performgroup.com/di/library/GOAL/a6/bb/fifa-18-ronaldo_lx3r88bpjpk91re36ukdgomrj.jpg?t=2027563652&w=620&h=430'
        }
    } else if (eventText === 'location') {
        msg = {
            "type": "location",
            "title": "my location",
            "address": "〒150-0002 東京都渋谷区渋谷２丁目２１−１",
            "latitude": 35.65910807942215,
            "longitude": 139.70372892916203
        }
    } else if (eventText === 'template button') {
        msg = {
            "type": "template",
            "altText": "this is a buttons template",
            "template": {
                "type": "buttons",
                "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                "title": "Menu",
                "text": "Please select",
                "actions": [{
                    "type": "postback",
                    "label": "Buy",
                    "data": "action=buy&itemid=123"
                }, {
                    "type": "postback",
                    "label": "Add to cart",
                    "data": "action=add&itemid=123"
                }, {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/123"
                }]
            }
        }
    } else if (eventText === 'template confirm') {
        msg = {
            "type": "template",
            "altText": "this is a confirm template",
            "template": {
                "type": "confirm",
                "text": "Are you sure?",
                "actions": [{
                    "type": "message",
                    "label": "Yes",
                    "text": "yes"
                }, {
                    "type": "message",
                    "label": "No",
                    "text": "no"
                }]
            }
        }
    } else if (eventText === 'carousel') {
        msg = {
            "type": "template",
            "altText": "this is a carousel template",
            "template": {
                "type": "carousel",
                "columns": [
                    {
                        "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                        "title": "this is menu",
                        "text": "description",
                        "actions": [
                            {
                                "type": "postback",
                                "label": "Buy",
                                "data": "action=buy&itemid=111"
                            },
                            {
                                "type": "postback",
                                "label": "Add to cart",
                                "data": "action=add&itemid=111"
                            },
                            {
                                "type": "uri",
                                "label": "View detail",
                                "uri": "http://example.com/page/111"
                            }
                        ]
                    },
                    {
                        "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                        "title": "this is menu",
                        "text": "description",
                        "actions": [
                            {
                                "type": "postback",
                                "label": "Buy",
                                "data": "action=buy&itemid=222"
                            },
                            {
                                "type": "postback",
                                "label": "Add to cart",
                                "data": "action=add&itemid=222"
                            },
                            {
                                "type": "uri",
                                "label": "View detail",
                                "uri": "http://example.com/page/222"
                            }
                        ]
                    }
                ]
            }
        }
    }
        return client.replyMessage(event.replyToken, msg);
    }
    catch(err){
        console.log(err);
    }
//Launch lintening server on port 80
}

function getCPUInfo() {
    var output = "";
    var cpus = os.cpus()
    for(var i = 0 , len = cpus.length; i < len; i++){
        var cpu = cpus[i];
        output += "\r\n" + cpu.model + " " + cpu.speed + "\r\nuser:" + cpu.times.user + " nice:" + cpu.times.nice + " sys:" + cpu.times.sys + " idle:" + cpu.times.idle + " irq:" + cpu.times.irq ;
    }
    output += "\r\nMemory" +"\r\n"+ os.freemem() +"/"+ os.totalmem() + "byte";

    return output
}
var errhandler = function(err){
    console.log(err);
}
app.listen(app.get('port'),function(){
    console.log('App Lintening on port ',app.get('port'));
});