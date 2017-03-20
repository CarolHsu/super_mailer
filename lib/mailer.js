var current_service;
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
var services_queue;
var obj = {
    send: function(from_email, to_email, subject, content) {
        const config  = require('config');
        current_service = current_service || obj.current_service(config);
        var request = require('request');
        var req_data = obj.options(from_email, to_email, subject, content, config);
        request(req_data, function(err, res, body){
            if(err){
                console.log('error posting json: ', err);
                throw err;
            }
            obj.logger(res, body, current_service);
            services_queue = services_queue || enable_services.filter(function(s){ return s != current_service });
            while(res.statusCode.toString()[0] != '2' && services_queue.length != 0){
                current_service = services_queue.pop();
                console.log("service queue status: ", services_queue);
                return obj.send(from_email, to_email, subject, content);
            }
        });
    },
    options: function (from_email, to_email, subject, content, config) {
        var options = require("./builders/" + current_service + "_builder.js")(from_email, to_email, subject, content, config);
        return options;
    },
    current_service: function(config){
        service = current_service || config.get("default");
        return service;
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
