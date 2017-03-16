var assert = require('assert');
var api = require('../../lib/sendgrid.js');
describe('#send', function(){
    var from_email, to_email, title, content, api;
    beforeEach(function() {
        from_email = "test@example.com";
        to_email = "test@example.com";
        subject = "Sending with SendGrid is Fun";
        content = "and easy to do anywhere, even with Node.js";
        res = api.send(from_email, to_email, subject, content);
    });
});
