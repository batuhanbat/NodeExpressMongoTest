// SET THE CONNECTION STRING PROPERLY
var host = ''
var username = ''
var password = ''
var port = ''
var dbname = ''

//read the db credentials file
var fs = require('fs')
var array = fs.readFileSync("C:/db_information.txt").toString().split("\n")
for(i in array) {
    if (i == 0) {
        host += array[i]
    } else if (i == 1) {
        username += array[i]
    } else if (i == 2) {
        password += array[i]
    } else if (i == 3) {
        port += array[i]
    } else if (i == 4) {
        dbname += array[i]
    }
}

// concat ops on conn. str.
var connstr = "mongodb://"
connstr += username.replace(/(\r\n|\n|\r)/gm, "") + ":"
connstr += password.replace(/(\r\n|\n|\r)/gm, "") + "@"
connstr += host.replace(/(\r\n|\n|\r)/gm, "") + ":"
connstr += port.replace(/(\r\n|\n|\r)/gm, "") + "/"
connstr += dbname.replace(/(\r\n|\n|\r)/gm, "") + "?"
connstr += "authSource=admin"

exports.connstr = connstr