var express = require('express');
var line = require('@line/bot-sdk');
var app = express();

app.set('port',(process.env.PORT || 80));

const config = {
    channelAccessToken : "PGDUuG+ZizRjnlGdLhHXlJQZflrZloEy3EKwrFm4XQeeLBG7rgUTPpqeGdrxqCBsoKagcL6Ou32MVyLdsWQf2njd/asEoKwUrTrzwk4gJM0RWey2napi4RDMsIK3LdoWityXm9T3jWXO4vrbDkrA5gdB04t89/1O/w1cDnyilFU=",
    channelSecret : "dd019042a09779942b5a37df9eb9ebcc"
};
const client = new line.Client(config);

//root url
app.get('/',function (req,res){
    res.send('Hello World')
});
app.post('/webhook',line.middleware(config),(req,res) => {
    Promise
        .all(req.body,events.map(handleEvent))
        .then((result) => res.json(result));
});

function handleEvent(event){
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
        text: 'สวัสดีครัช'
    };
    return client.replyMessage(event.replyToken,msg);
//Launch lintening server on port 80
}
app.listen(app.get('port'),function(){
    console.log('App Lintening on port ',app.get('port'));
});