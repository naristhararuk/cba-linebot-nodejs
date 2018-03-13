var express = require('express');
var line = require('@line/bot-sdk');
var app = express();

app.set('port',(process.env.PORT || 80));

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
        .then((result) => res.json(result));
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
    var msg = {
        type: 'text',
        text: 'สวัสดีครับนี่เป็นระบบตอบกลับอัตโนมัติจาก CBA'
    };
    var eventText = event.message.text.toLowerCase();

    if (eventText === 'image') {
        msg = {
            'type': 'image',
            'originalContentUrl': 'https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100',
            'previewImageUrl': 'https://images.performgroup.com/di/library/GOAL/a6/bb/fifa-18-ronaldo_lx3r88bpjpk91re36ukdgomrj.jpg?t=2027563652&w=620&h=430'
        }
    }

    return client.replyMessage(event.replyToken, msg);
//Launch lintening server on port 80
}
app.listen(app.get('port'),function(){
    console.log('App Lintening on port ',app.get('port'));
});