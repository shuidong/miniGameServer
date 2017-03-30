/*
* 此处罗列出了一些常用的功能
*/
var fs = require('fs');

var util = module.exports = {};
util.getNowTime = function(){
	return Date.now();
}

/*
* 遍历 控制器目录 下的脚本，提取其中的方法，动态添加路由
*/
util.routeAdaptor = function(app){
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
