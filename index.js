var express = require('express');
var http = require('http');
var path = require('path');

//express要求用这个来解析传过来的数据
var bodyParser = require('body-parser');
//var jsonParser = bodyParser.json()

var app = express();

//设置端口
app.set('port', process.env.PORT || 3000);

//设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

//让数据包体解析器发生作用
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//监听路由
app.get('/', function(req, res, next){
	console.log('hello world!');
});

//启动web服务器
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('game server listening on port ' + app.get('port'));
});