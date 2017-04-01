/*
* 此文件对外提供所有的配置
*/
var httpConf = require('./httpConf.js');
var log4js = require('./log4js.json');

module.exports = {
	version : "1.0",
	http : httpConf,
	log4js : log4js
}