//固定套路，先让exports是个空对象
var exp = module.exports = {};

//为这个exports对象添加各种方法，注意函数的参数
exp.action1 = function(req, res){
	console.log("sample.action1");
}

exp.action2 = function(req, res){
	console.log("sample.action2");
}

exp.action3 = function(req, res){
	console.log("sample.action3");
}