module.exports = function(from_email, to_email, subject, content){
    from_email = process.env.MAILGUN_SAND_BOX;
    var auth = process.env.MAILGUN_API_KEY;
    var from_domain = from_email.split("@")[1];
    var url = "https://api:" + auth + "@api.mailgun.net/v3/" + from_domain + "/messages";
    var data = {
        from: from_email,
        to: to_email,
        subject: subject,
        text: content
    };
    var options = {
        method: 'post',
        url: url,
        form: data
    };

    return options
};
