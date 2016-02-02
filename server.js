var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var emailRegex = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g;
var phoneRegex = /([+\s]\d{12}|[+\.\s]\d{1}[-\.\s]\d{10}|[+\.\s]\d{2}[-\.\s]\d{10}|\d{3}[-\.\s]\d{3}[-\.\s]\d{4}|\d{2}[-\.\s]\d{3}[-\.\s]\d{5}|\d{3}[-\.\s]\d{7}|\d{10}|\(\d{3}\)\s*\d{3}[-\.\s]\d{4}|\d{3}[-\.\s]\d{4})/g;

http.createServer(function(req, res) {
    var phone = [],
        email = [],
        json = {
            'phone': {
            },
            'email': {
            }
        },
        i = 0;

    fs.readFile('./output.txt', 'utf8', function (err, data) {
        if (err) throw err;
        phone = data.match(phoneRegex);
        email = data.match(emailRegex);

        for (var i = 0; i < phone.length; i++) {
            json.phone['tel'+(i+1)] = phone[i];
        };
        for (var i = 0; i < email.length; i++) {
            json.email['email'+(i+1)] = email[i];
        };
        console.log(json);
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('200',{"Content-Type":"text/vcard"});
    res.write('fetching data from file...');
    res.end();
}).listen(4786);
