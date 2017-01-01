
var express = require('express');

var router = express();
var multiparty = require('multiparty');
var fs = require('fs');

module.exports = function(app)
{
	app.get('/', function(req, res)
	{
		res.render('index.html');
	});
	app.get('/about', function(req, res)
	{
		res.render('about.html');
	});
	app.get('/multipartyUpload', function(req, res)
	{
		console.log('multiparty');
		res.render('multipartyUpload.html');
	});
	app.post('/upload', function(req, res, next)
	{
		var form = new multiparty.Form();
     
      // get field name & value
      form.on('field',function(name,value){
           console.log('normal field / name = '+name+' , value = '+value);
      });
     
      // file upload handling
      form.on('part',function(part){
           var filename;
           var size;
           if (part.filename) {
                 filename = part.filename;
                 size = part.byteCount;
           }else{
                 part.resume();
          
           }    
 
           console.log("Write Streaming file :"+filename);
           var writeStream = fs.createWriteStream('/tmp/'+filename);
           writeStream.filename = filename;
           part.pipe(writeStream);
 
           part.on('data',function(chunk){
                 console.log(filename+' read '+chunk.length + 'bytes');
           });
          
           part.on('end',function(){
                 console.log(filename+' Part read complete');
                 writeStream.end();
           });
      });
 
      // all uploads are completed
      form.on('close',function(){
           res.status(200).send('Upload complete');
      });
     
      // track progress
      form.on('progress',function(byteRead,byteExpected){
           console.log(' Reading total  '+byteRead+'/'+byteExpected);
      });
     
      form.parse(req);
	});

  app.get('/list', function(req, res, next) {
    // 그냥 board/ 로 접속할 경우 전체 목록 표시로 리다이렉팅

    var array1 = { idx : 'a', path : '/tmp/test.file', title : 'b'};
    var array2 = { idx : 'b', path : '/tmp/test2.file', title : 'c'};

    var tmp = [array1, array2];
    var title = "list Test";

    res.render('list.ejs', {title : title, rows: tmp});
});
}