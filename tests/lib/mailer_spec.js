var assert = require('assert');
var sinon  = require('sinon');
var request = require('request');
var mailer = require('../../lib/mailer.js');
describe('#send', function(){
    beforeEach(function() {
        from_email = "test@example.com"
        to_email = "test@example.com"
        subject = "test"
        content = "test"
        sinon.spy(request, 'post');
    });
    afterEach(function() {
        request.post.restore();
    });

    it('should post http request without any callback', function() {
        var data = {to: "test", from: "test"}
        var options = {method: 'post', url: "http://test.com", json: JSON.stringify(data) }
        var callback = sinon.spy();
        var proxy = mailer.send_with_data(options, from_email, to_email, subject, content, callback);

        assert(callback.notCalled);
    });
});
