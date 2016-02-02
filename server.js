var http = require('http');
var https = require('https');
var url = require('url');
var fs = require('fs');
var path = require('path');
var cse_token = '008171334859300485105:xjnxxb8dxnk';
var g_api_key = 'AIzaSyDNUZTem7yknzqZuWrJfOGmDUERMi1J6KA';
var no_items = 10;

http.createServer(function(req, res) {
     console.log("url >>>", req.url);
    var uId = url.parse(req.url,true).query.uId,
        obj = '';

    console.log("uId >>>", uId);
    console.log("exists >>>>", fs.existsSync("./src/vcard.json"));
    fs.readFile('./src/vcard.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        console.log(obj);
    });
    var jsonData = vcard.convertJsonToVCF(obj);
    fs.writeFile(__dirname + '/' + uId +'-myvcard.vcf', jsonData, function(err){
        if (err) throw err;
    });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('200',{"Content-Type":"text/vcard"});
    res.write('data reader from file');
    res.end();
}).listen(4786);
