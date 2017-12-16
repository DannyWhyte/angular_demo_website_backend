global._ = require('underscore');
global.fs = require('fs');
global.q = require('q');

const BASE_URL = '/api'


var express = require('express');
var app = express();


var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.raw({ limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.use(xmlparser());


app.get(BASE_URL + '/ping', function(req, res, next) {
    res.send('pong')
})
app.post(BASE_URL + '/sendemail', require('./sendEmail.js').testing)

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})