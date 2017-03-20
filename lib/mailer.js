var current_service;
function not_current_service(service) {
    return service != current_service;
}
function get_enable_serives(file_names_) {
    file_names_ = file_names_ || [];
    const fs  = require('fs');
    const builders_path = __dirname + '/builders/';
    var services = []
    fs.readdir(builders_path, (err, files) => {
        files.forEach(filename => {
            file_names_.push(filename.split("_")[0]);
        });
        console.log("*** super_mailer is able to support services: ", file_names_);
    });
    return file_names_;
}
var enable_services = get_enable_serives();
var services_queue = enable_services.filter(not_current_service);
var obj = {
    send: function(from_email, to_email, subject, content, service) {
        current_service = obj.current_service(service);
        var request = require('request');
        var req_data = obj.options(from_email, to_email, subject, content);
        request(req_data, function(err, res, body){
            if(err){
                console.log('error posting json: ', err);
                throw err;
            }
            obj.logger(res, body, current_service);
            while(res.statusCode.toString()[0] != '2' && services_queue.length != 0){
                return obj.send(from_email, to_email, subject, content, services_queue.pop());
            }
        });
    },
    options: function (from_email, to_email, subject, content) {
        var options = require("./builders/" + current_service + "_builder.js")(from_email, to_email, subject, content);
        return options;
    },
    current_service: function(service){
        var service = typeof service !== 'undefined' ? service : 'amazonses';
        return service
    },
    logger: function(response, body, current_service) {
        var headers = response.headers;
        var statusCode = response.statusCode;
        console.log('headers: ', headers);
        console.log('statusCode: ', statusCode);
        console.log('body: ', body);
        console.log('<------ Mail sent via: ', current_service);
    }
};

module.exports = obj;
