var assert = require('assert');
var mailer = require('../../lib/mailer.js');
describe('#send', function(){
    var from_email, to_email, title, content, api;
    beforeEach(function() {
        from_email = "test@example.com";
        to_email = "test@example.com";
        subject = "Sending with SendGrid is Fun";
        content = "and easy to do anywhere, even with Node.js";
        //mailer.send(from_email, to_email, subject, content);
    });
});
