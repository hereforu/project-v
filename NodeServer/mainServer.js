var express = require('express');
var app = express();
var router = require('./router/main')(app);
var multiparty = require('multiparty');
var fs = require('fs');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function(){
	console.log("express server has port 3000")
})

app.use(express.static('public'));
