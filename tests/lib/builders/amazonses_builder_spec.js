var assert = require('assert');
var builder = require('../../../lib/builders/amazonses_builder.js');
describe('builder', function(){
    describe('Amazon SES', function() {
        var from_email, to_email, title, content, body;
        beforeEach(function() {
            from_email = "test@example.com";
            to_email = "test@example.com";
            subject = "Sending with Amazon SES is Fun";
            content = "and easy to do anywhere, even with Node.js";
            options = builder(from_email, to_email, subject, content);
        });
        it('should include #Action', function(){
            assert.equal('SendEmail', options.json.Action);
        });
        it('should include valid #from_email, which setup in env variables', function(){
            assert.equal(process.env.AMZSES_VALID_MAILBOX, options.json.Source);
        });
        it('should include #to_email', function(){
            assert.equal(to_email, options.json.Destination.ToAddresses[0]);
        });
        it('should include #subject', function(){
            assert.equal(subject, options.json.Message.Subject.Data);
        });
        it('should include #content', function(){
            assert.equal(content, options.json.Message.Body.Text.Data);
        });
        it('should have Date in headers', function(){
            now = (new Date()).toUTCString();
            assert.equal(now, options.headers.Date);
        });
        it('should have Authorization information in headers', function(){
            crypto  = require('crypto');
            hmac = function(key, time){
                var hash = crypto.createHmac('sha256', key);
                return hash.update(time).digest('base64');
            };
            now = (new Date()).toUTCString();
            auth = 'AWS3-HTTPS AWSAccessKeyId=' + process.env.AMZSES_API_KEY_ID + ', Algorithm=HmacSHA256, Signature=' + hmac(process.env.AMZSES_SECRET_KEY, now);
            assert.equal(auth, options.headers['X-Amzn-Authorization']);
        });
        it('should include correct endpoint', function() {
            host = 'email.us-east-1.amazonaws.com';
            uri = '/'
            url = 'https://' + host + uri;
            assert.equal(url, options.url);
        });
        it('the HTTP method should be "post"', function () {
            assert.equal('post', options.method);
        });
    });
});
