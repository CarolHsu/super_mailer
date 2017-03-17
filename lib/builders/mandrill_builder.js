module.exports = function(from_email, to_email, subject, content){
    var url = 'https://mandrillapp.com/api/1.0/messages/send.json';
    var auth = process.env.MANDRILL_API_KEY;
    var signNow = getDateTime();
    var data = {
        key: auth,
        message: {
            text: content,
            subject: subject,
            from_email: from_email,
            to: [ 
                {
                    email: to_email
                }
            ]
        },
        send_at: signNow
    };

    var options = {
        method: 'post',
        url: url,
        json: true,
        headers: {
            'User-Agent': 'Mandrill-Curl/1.0'
        },
        body: data
    }

    return options;
};

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;

}
