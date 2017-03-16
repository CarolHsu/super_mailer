module.exports = function(from_email, to_email, title, content) {
    from_email = typeof from_email !== 'undefined' ? from_email : "test@example.com";
    to_email = typeof to_email !== 'undefined' ? to_email : "test@example.com";
    title = typeof title !== 'undefined' ? title : "Sending with SendGrid is Fun";
    content = typeof content !== 'undefined' ? content : "and easy to do anywhere, even with Node.js";
    var sendgrid = require('./lib/sendgrid.js');
    sendgrid.send(from_email, to_email, title, content);
};
