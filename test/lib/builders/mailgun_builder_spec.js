var assert = require('assert');
var builder = require('../../../lib/builders/mailgun_builder.js');
describe('builder', function(){
    describe('MailGun', function() {
        var from_email, to_email, title, content, body;
        beforeEach(function() {
            from_email = "test@example.com";
            to_email = "test@example.com";
            subject = "Sending with MailGun is Fun";
            content = "and easy to do anywhere, even with Node.js";
            options = builder(from_email, to_email, subject, content);
        });
        it('should include #from_email, and set in env variable MAILGUN_SAND_BOX', function(){
            assert.equal(process.env.MAILGUN_SAND_BOX, options.form.from);
        });
        it('should include #to_email', function(){
            assert.equal(to_email, options.form.to);
        });
        it('should include #subject', function(){
            assert.equal(subject, options.form.subject);
        });
        it('should include #content', function(){
            assert.equal(content, options.form.text);
        });
        it('should have authorization information in endpoint', function(){
            url = "https://api:" + process.env.MAILGUN_API_KEY + "@api.mailgun.net/v3/" + process.env.MAILGUN_SAND_BOX.split("@")[1] + "/messages";
            assert.equal(url, options.url);
        });
        it('the HTTP method should be "post"', function () {
            assert.equal('post', options.method);
        });
    });
});
