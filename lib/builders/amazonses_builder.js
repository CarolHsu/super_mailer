module.exports = function(from_email, to_email, subject, content) {
    from_email = process.env.AMZSES_VALID_MAILBOX;
    var crypto  = require('crypto');
    var hmac = function(key, time){
        var hash = crypto.createHmac('sha256', key);
        return hash.update(time).digest('base64');
    };
    var host = 'email.us-east-1.amazonaws.com';
    var uri = '/'
    var url = 'https://' + host + uri;
    var now = (new Date()).toUTCString();
    var auth = 'AWS3-HTTPS AWSAccessKeyId=' + process.env.AMZSES_API_KEY_ID + ', Algorithm=HmacSHA256, Signature=' + hmac(process.env.AMZSES_SECRET_KEY, now);
    console.log("----auth----", auth);
    var body = {
        'Action': 'SendEmail',
        'Source': from_email,
        'Destination': {
            'ToAddresses': [
                to_email
            ]
        },
        'Message': {
            'Body': {
                'Text': {
                    'Date': content
                }
            },
            'Subject': {
                'Data': subject
            }
        }
    };
    var headers = {
        'Date': now,
        'X-Amzn-Authorization': auth
    };
    var options = {
        method: 'post',
        url: url,
        headers: headers,
        json: body
    };
    return options;
};
