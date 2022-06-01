const mysql = require('mysql2');

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Diamond2022@',
    database:'ram_contact'
})

db.connect(function(err){
    if (err) {
        throw err;
    }
    console.log("database connected successfully")
})

module.exports = db;