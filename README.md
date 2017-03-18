# Introduction

super_mailer is a multiple mail service API connector, include AWS SES, Sendgrid, Mandrill and Mailgun. You can set your default mail service, once there's a failure exists, super_mailer will try another mail service for you automatically.

# Supporting Mail Services

* [Sendgrid](http://sendgrid.com)
* [Mailgun](http://mailgun.com)
* [Mandrill](http://mandrillapp.com) - Merge with [MailChimp](http://mailchimp.com) from April 27, 2016
* [Amazon SES](https://aws.amazon.com/ses/)

After sign up those services and get the neccessary API Key settings, then you can start to use super_mailer then :)


# Installation

```
$ npm install super_mailer
$ cp mailer.env.example mailer.env
```

Information you should fill in your ```mailer.env```

```
export SENDGRID_API_KEY='<SENDGRID_API_KEY>'
export MAILGUN_SAND_BOX='<MAILGUN_SAND_BOX>'
export MAILGUN_API_KEY='<MAILGUN_API_KEY>'
export MANDRILL_API_KEY='<MANDRILL_API_KEY>'
export AMZSES_API_KEY_ID='<AMZSES_API_KEY_ID>'
export AMZSES_SECRET_KEY='<AMZSES_SECRET_KEY>'
export AMZSES_VALID_MAILBOX='<AMZSES_VALID_MAILBOX>'
```

Then ```$ source ./mailer.env``` to enable those information.


# Usage

Usage example:

```
var super_mailer = require('super_mailer');
from_email = "test@eamil.com";
to_email = "test@eamil.com";
subject = "Test";
content = "This is a test mail. Enjoy it!";
default_service = 'sendgrid';
super_mailer(from_email, to_email, subject, content);
```

You can choose your prefer default_service, such as ```'sendgrid'```, ```'mailgun'```, ```'mandrill'``` and ```'amazonses'```


# Tests

Now, you can test all builders of mail services by

```
$ npm test
```

