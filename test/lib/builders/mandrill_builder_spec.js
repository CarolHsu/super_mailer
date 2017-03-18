var assert = require('assert');
var builder = require('../../../lib/builders/mandrill_builder.js');
describe('builder', function(){
    describe('Mandrill', function() {
        var from_email, to_email, title, content, body;
        beforeEach(function() {
            from_email = "test@example.com";
            to_email = "test@example.com";
            subject = "Sending with Mandrill is Fun";
            content = "and easy to do anywhere, even with Node.js";
            options = builder(from_email, to_email, subject, content);
        });
        it('should include #from_email', function(){
            assert.equal(from_email, options.body.message.from_email);
        });
        it('should include #to_email', function(){
            assert.equal(to_email, options.body.message.to[0].email);
        });
        it('should include #subject', function(){
            assert.equal(subject, options.body.message.subject);
        });
        it('should include #content', function(){
            assert.equal(content, options.body.message.text);
        });
        it('should include #key', function(){
            auth = process.env.MANDRILL_API_KEY;
            assert.equal(auth, options.body.key);
        });
        it('should not be empty with #send_at', function(){
            assert.equal(true, options.body.send_at.length > 0);
        });
        it('should include correct endpoint', function() {
            url = 'https://mandrillapp.com/api/1.0/messages/send.json';
            assert.equal(url, options.url);
        });
        it('the HTTP method should be "post"', function () {
            assert.equal('post', options.method);
        });
    });
});
