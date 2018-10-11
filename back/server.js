var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(8080, function () {
  console.log('Server listening on port 8080!');
});

app.post('/fetchtoken', function (req, res) {
    console.log('Fetching token');
    var headers = {
        "Content-Type":"application/x-www-form-urlencoded"
    };

    var options = {
        url: 'https://openapi.shl.se/oauth2/token',
        method: 'POST',
        headers: headers,
        body: "grant_type=client_credentials"
          + "&client_id=EXAMPLE"
          + "&client_secret=EXAMPLE"
    };

    request(options, function(error, response, body) {

        if (error) {
            console.log("Something went wrong trying to fetch token: ", error);
        } else {
          console.log(body)
            res.send(body);
            res.end();
            console.log("Token fetched!");
        }
    });
});

app.post('/fetchtable', function (req, res) {
    console.log('Fetching table', req.body);
    var accessData = req.body.accessData;
    var season = req.body.season.split('-')[0];
    console.log(season);

    var headers = {
        "Authorization": accessData.token_type + " " + accessData.access_token
    }

    var options = {
        url: "https://openapi.shl.se/seasons/" +season + "/statistics/teams/standings",
        method: 'GET',
        headers: headers
    };

    request(options, function(error, response, body) {
        if (error) {
            console.log("Something went wrong trying to fetch table: ", error);
        } else {
            res.send(body);
            res.end();
            console.log("Table fetched and updated!");
        }

    });
});
