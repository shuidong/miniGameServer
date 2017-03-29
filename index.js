var express = require('express');
var http = require('http');
var path = require('path');

//express要求用这个来解析传过来的数据
var bodyParser = require('body-parser');

var util = require('./util/util.js');

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
app.get('/echo', function(req, res, next){
	//1.从req的query中获取提交过来的参数
	//注意这种提取方式完全是bodyParser的功劳，否则要自己对res监听data与end事件才行
	//对于http://127.0.0.1:3000/echo?a=99&b=nihao
	//服务器这里将会打印 { a: '99', b: 'nihao' }
	console.dir(req.query);

	//2.把传过来的数据再回传过去
	res.send(JSON.stringify(req.query));
	//3.关闭这个流
	res.end();
});

//如果是post请求，则通过req.body获取
//关于如何使用curl来模拟post一些json数据测试，请参考tool下面的资料
app.post('/echo', function(req, res, next){
	//获取该请求的头部信息
	//开发的时候有可能把一些特殊字段放这里
	//console.dir(req.headers);
	//console.dir(req.body);

	res.contentType('json');//返回的数据类型
	res.send(JSON.stringify(req.body));//给客户端返回一个json格式的数据
	res.end();
});

//启动web服务器
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('game server listening on port ' + app.get('port'));
});