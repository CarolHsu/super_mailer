module.exports = function(from_email, to_email, title, content) {
    var mailer = require('./lib/mailer.js');
    mailer.send(from_email, to_email, title, content);
};
