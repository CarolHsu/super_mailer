module.exports = {
    send: function(from_email, to_email, subject, content) {
        var sg  = require('sendgrid')(process.env.SENDGRID_API_KEY);
        var mail = require('./builders/sendgrid_builder.js')(from_email, to_email, subject, content);
        request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail
        });

        sg.API(request, function(error, response) {
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
        })
    }
};
