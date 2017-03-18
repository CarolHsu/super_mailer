var assert = require('assert');
var builder = require('../../../lib/builders/sendgrid_builder.js');
describe('builder', function(){
    describe('SendGrid', function() {
        var from_email, to_email, title, content, body;
        beforeEach(function() {
            from_email = "test@example.com";
            to_email = "test@example.com";
            subject = "Sending with SendGrid is Fun";
            content = "and easy to do anywhere, even with Node.js";
            options = builder(from_email, to_email, subject, content);
        });
        it('should include #from_email', function(){
            assert.equal(from_email, options.body.from.email);
        });
        it('should include #to_email', function(){
            assert.equal(to_email, options.body.personalizations[0].to[0].email);
        });
        it('should include #subject', function(){
            assert.equal(subject, options.body.personalizations[0].subject);
        });
        it('should include #content', function(){
            assert.equal('text/plain', options.body.content[0].type);
            assert.equal(content, options.body.content[0].value);
        });
        it('should have authorization information in headers', function(){
            auth = 'Bearer ' + process.env.SENDGRID_API_KEY;
            assert.equal(auth, options.headers['authorization']);
        });
        it('should include correct endpoint', function() {
            url = 'https://api.sendgrid.com/v3/mail/send';
            assert.equal(url, options.url);
        });
        it('the HTTP method should be "post"', function () {
            assert.equal('post', options.method);
        });
    });
});
