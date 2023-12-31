const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();


const app = express();


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "388993",
    database: "nodejs"
});

connection.connect(function(error){
    if(error) throw error
    else console.log("connected to the database successfuly!")
});

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",encoder,function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from loginuser where user_name =? and user_pass=?",function(error,results,fields){
        if (results.length > 0) {
            res.redirect("/welcome");
        }else {
            res.redirect("/");
        }
        res.end();
    })
})

app.get("/welcome", function(req,res){
    res.sendFile(__dirname + "/welcome.html");
})

app.listen(4000);

