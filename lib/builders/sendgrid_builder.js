module.exports = function(from_email, to_email, subject, content, config){
    from_email = from_email || config.get('sendgrid.stub.from_email');
    to_email = to_email || config.get('sendgrid.stub.to_email');
    subject = subject || config.get('sendgrid.stub.subject');
    content = content || config.get('sendgrid.stub.content');
    var url = config.get('sendgrid.endpoint');
    var auth = 'Bearer ' + process.env.SENDGRID_API_KEY;
    var data = {
        personalizations:[
            {
                to: [
                    {
                        email: to_email
                    }
                ],
                subject: subject
            }
        ],
        from: {
            email: from_email
        },
        content: [
            {
                type: "text/plain",
                value: content
            }
        ]
    };
    var options = {
        method: 'post',
        headers: {
            'authorization': auth
        },
        body: data,
        json: true,
        url: url
    };

    return options;
};
