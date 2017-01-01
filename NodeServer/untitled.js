var http = require('http');

var options = {
	host : 'localhost',
	port : '8082',
	path : '/main.html'
};

var callback = function(res)
{
	var body = '';
	res.on('data', function(data)
	{
		body += data;
	});
}