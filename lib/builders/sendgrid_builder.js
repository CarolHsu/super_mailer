module.exports = function(from_email, to_email, subject, content){
    var url = 'https://api.sendgrid.com/v3/mail/send';
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
