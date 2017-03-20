module.exports = function(from_email, to_email, subject, content, config){
    from_email = process.env.MAILGUN_SAND_BOX;
    var stub_to_email = config.get('mailgun.stub.to_email');
    to_email = to_email || stub_to_email;
    subject = subject || config.get('mailgun.stub.subject');
    content = content || config.get('mailgun.stub.content');
    var auth = process.env.MAILGUN_API_KEY;
    var from_domain = from_email.split("@")[1];
    var url = "https://api:" + auth + "@api.mailgun.net/v3/" + from_domain + "/messages";
    var data = {
        from: from_email,
        to: to_email,
        subject: subject,
        text: content
    };
    if(to_email == stub_to_email) {
        console.log("mailgun in test mode");
        data['o:testmode'] = true;
    }
    var options = {
        method: 'post',
        url: url,
        form: data
    };

    return options
};
