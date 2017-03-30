/*
* 此处罗列出了一些常用的功能
*/
var fs = require('fs');

var utils = module.exports = {};
utils.getNowTime = function(){
	return Date.now();
}

/*
* 遍历 控制器目录 下的脚本，提取其中的方法，动态添加路由
*/
utils.routeAdaptor = function(app){
	const relativePath = "../controllers/";
	var controllerPath = __dirname + "/" + relativePath;
	var files = fs.readdirSync(controllerPath);
	files.forEach(function(jsFileName) {
		var tmpPath = controllerPath + '/' + jsFileName;
		var requireName = "./" + relativePath + jsFileName;
		// console.log(requireName);
		const instance = require(requireName);
		const methods = Object.keys(instance);
		// console.dir(methods);
		methods.forEach(methodName => {
			// console.log(methodName);
			const routeName = "/" + jsFileName.replace(/\.js$/, '') + "/" + methodName;
			console.log("@", routeName);
			app.post(routeName, instance[methodName]);
		});
	});
}

/*
* process.uptime()用于获取程序已运行的秒数
*/
var _profileTime = -1;
utils.profileStart = function(){
	_profileTime = process.uptime();
}


/**
 * Invoke callback with check
 */
utils.invokeCallback = function (cb) {
  if (!!cb && typeof cb === 'function') {
    cb.apply(null, Array.prototype.slice.call(arguments, 1));
  }
}

utils.isDebug = function(){
	var env = process.env.NODE_ENV || 'production';
	env = env.toLowerCase();
	return env !== 'production';
}

