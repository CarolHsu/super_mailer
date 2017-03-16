module.exports = function(from_email, to_email, subject, content){
    var helper  = require('sendgrid').mail;
    from = new helper.Email(from_email);
    to = new helper.Email(to_email);
    title = subject;
    plain_content = new helper.Content("text/plain", content);
    mail = new helper.Mail(from, title, to, plain_content);
    return mail.toJSON();
};
