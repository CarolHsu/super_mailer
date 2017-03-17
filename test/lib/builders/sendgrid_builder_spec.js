var assert = require('assert');
var builder = require('../../../lib/builders/sendgrid_builder.js');
describe('builder', function(){
    var from_email, to_email, title, content, body;
    beforeEach(function() {
        from_email = "test@example.com";
        to_email = "test@example.com";
        subject = "Sending with SendGrid is Fun";
        content = "and easy to do anywhere, even with Node.js";
        body = builder(from_email, to_email, subject, content);
    });
    it('#from_email', function(){
        assert.equal(from_email, body.from.email);
    });
    it('#subject', function(){
        assert.equal(subject, body.subject);
    });
    it('#content', function(){
        assert.equal(content, body.content[0].value);
    });
});
