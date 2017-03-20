var assert = require('assert');
var builder = require('../../../lib/builders/amazonses_builder.js');
var config = require('config');
describe('builder', function(){
    describe('Amazon SES', function() {
        var from_email, to_email, title, content, body;
        beforeEach(function() {
            from_email = process.env.AMZSES_VALID_MAILBOX;
            to_email = "success@simulator.amazonses.com";
            subject = "Sending with Amazon SES is Fun";
            content = "and easy to do anywhere, even with Node.js";
            body = {
                'Action': 'SendEmail',
                'Source': from_email,
                'Destination.ToAddresses.member.1': to_email,
                'Message.Body.Text.Data': content,
                'Message.Subject.Data': subject
            };
            qs = require('querystring').stringify(body);
            options = builder(from_email, to_email, subject, content, config);
        });
        it('should include query string', function(){
            assert.equal(qs, options.url.split("?")[1]);
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
            url = 'https://' + host + '?' + qs;
            assert.equal(url, options.url);
        });
        it('the HTTP method should be "post"', function () {
            assert.equal('post', options.method);
        });
    });
});
