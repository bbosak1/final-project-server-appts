// Set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/students");

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var Appt = mongoose.model('Appt', {
    date: String,
    appt: String
});

// Get all appts
app.get('/api/appts', function (req, res) {

    console.log("Listing appts...");

    //use mongoose to get all appts in the database
    Appt.find(function (err, appts) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(appts); // return all appts in JSON format
    });
});


// Start app and listen on port 8081
app.listen(process.env.PORT || 8081);
console.log("Appts server listening on port  - ", (process.env.PORT || 8081));