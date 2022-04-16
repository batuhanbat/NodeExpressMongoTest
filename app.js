const express = require('express');
const mongoose = require('mongoose');
const app = express();

var host = '';
var username = '';
var password = '';
var port = '';
var dbname = '';

var fs = require('fs');
var array = fs.readFileSync("C:/db_information.txt").toString().split("\n");
for(i in array) {
    if (i == 0) {
        host += array[i];
    } else if (i == 1) {
        username += array[i];
    } else if (i == 2) {
        password += array[i];
    } else if (i == 3) {
        port += array[i];
    } else if (i == 4) {
        dbname += array[i];
    }
}

var connstr = "mongodb://";
connstr += username.replace(/(\r\n|\n|\r)/gm, "") + ":";
connstr += password.replace(/(\r\n|\n|\r)/gm, "") + "@";
connstr += host.replace(/(\r\n|\n|\r)/gm, "") + ":";
connstr += port.replace(/(\r\n|\n|\r)/gm, "") + "/";
connstr += dbname.replace(/(\r\n|\n|\r)/gm, "") + "?";
connstr += "authSource=admin";

mongoose.connect(connstr);
