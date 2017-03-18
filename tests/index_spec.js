var assert = require('assert');
var post = require('../index.js');
describe('#send', function(){
    var from_email, to_email, title, content, post;
    beforeEach(function() {
        from_email = "test@example.com";
        to_email = "test@example.com";
        subject = "Sending with SendGrid is Fun";
        content = "and easy to do anywhere, even with Node.js";
        post = post(from_email, to_email, subject, content);
    });
});
