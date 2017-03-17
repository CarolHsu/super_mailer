module.exports = {
    send: function(from_email, to_email, subject, content) {
        var request  = require('request');
        var options = require('./builders/sendgrid_builder.js')(from_email, to_email, subject, content);

        request(options, function(err, res){
            if(err){
                console.err('error posting json: ', err);
                throw err;
            }
            var headers = res.headers;
            var statusCode = res.statusCode;
            console.log('headers: ', headers);
            console.log('statusCode: ', statusCode);
        });
    }
};
