//TODO: get builder's file name
var services = ["mandrill", "mailgun", "sendgrid"];
var obj = {
    send: function(from_email, to_email, subject, content, service) {
        var request = require('request');
        //TODO: user can setup their high priority mail service
        service = typeof service !== 'undefined' ? service : 'amazonses';
        var options = require("./builders/" + service + "_builder.js")(from_email, to_email, subject, content);
        request(options, function(err, res, body){
            if(err){
                console.log('error posting json: ', err);
                while(services.length != 0){
                    obj.send(from_email, to_email, subject, content, services.pop());
                }
                throw err;
            }
            var headers = res.headers;
            var statusCode = res.statusCode;
            console.log('headers: ', headers);
            console.log('statusCode: ', statusCode);
            console.log('body: ', body);
        });
    }
};

module.exports = obj;
