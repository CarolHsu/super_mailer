module.exports = function(from_email, to_email, subject, content, config) {
    from_email = process.env.AMZSES_VALID_MAILBOX;
    to_email = to_email || config.get('amazonses.stub.to_email');
    subject = subject || config.get('amazonses.stub.subject');
    content = content || config.get('amazonses.stub.content');
    var now = (new Date()).toUTCString();
    var crypto  = require('crypto');
    var hmac = function(key, time){
        var hash = crypto.createHmac('sha256', key);
        return hash.update(time).digest('base64');
    };
    var auth = 'AWS3-HTTPS AWSAccessKeyId=' + process.env.AMZSES_API_KEY_ID + ', Algorithm=HmacSHA256, Signature=' + hmac(process.env.AMZSES_SECRET_KEY, now);
    var body = {
        'Action': 'SendEmail',
        'Source': from_email,
        'Destination.ToAddresses.member.1': to_email,
        'Message.Body.Text.Data': content,
        'Message.Subject.Data': subject
    };
    var qs  = require('querystring').stringify(body);
    var host = 'email.us-east-1.amazonaws.com';
    var url = 'https://' + host + "?" + qs;
    var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': qs.length,
        'Date': now,
        'X-Amzn-Authorization': auth
    };
    var options = {
        method: 'post',
        url: url,
        headers: headers,
        json: true
    };
    return options;
};
