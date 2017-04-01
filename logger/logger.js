var log4js = require('log4js');
var fs = require('fs');
var path = require('path');


function configure(config,opt){
	opt = opt || {};
	log4js.configure(config,opt);
};

function getLogger(categoryName) {
	var args = arguments;
	var prefix = "";
	for (var i = 1; i < args.length; i++) {
		if (i !== args.length - 1)
			prefix = prefix + args[i] + "] [";
		else
			prefix = prefix + args[i];
	}
	if (typeof categoryName === 'string') {
		// category name is __filename then cut the prefix path
		categoryName = categoryName.replace(process.cwd(), '');
	}
	var logger = log4js.getLogger(categoryName);
	var pLogger = {};
	for (var key in logger) {
		pLogger[key] = logger[key];
	}

	['log', 'debug', 'info', 'warn', 'error', 'trace', 'fatal'].forEach(function(item) {
		pLogger[item] = function() {
			var p = "";

			if (!process.env.RAW_MESSAGE&&item != "info") {
				if (args.length > 1) {
					p = "[" + prefix + "] ";
				}
				if (args.length && process.env.LOGGER_LINE) {
					p = getLine() + ": " + p;
				}
				p = colorize(p, colours[item]);
			}

			if (args.length) {
				arguments[0] = p + arguments[0];
			}
			logger[item].apply(logger, arguments);
		}
	});
	return pLogger;
};

function getLog4js(){
	return log4js;
}

function colorizeStart(style) {
	return style ? '\x1B[' + styles[style][0] + 'm' : '';
}

function colorizeEnd(style) {
	return style ? '\x1B[' + styles[style][1] + 'm' : '';
}
/**
 * Taken from masylum's fork (https://github.com/masylum/log4js-node)
 */
function colorize(str, style) {
	return colorizeStart(style) + str + colorizeEnd(style);
}

function createLogDir(appendersArr){
    for(var i = 0;i<appendersArr.length;i++){
        var locAppenders = appendersArr[i];
        for(var key in locAppenders){
            var locObj = locAppenders[key];
            if(locObj.type == "dateFile"){
                var locIndex = locObj.filename.lastIndexOf("/");
                var locDir = locObj.filename.substr(0,locIndex+1);
                //fs.mkdirSync(locDir);
                locDir.split('/').forEach((dir, index, splits) => {
				  const parent = splits.slice(0, index).join('/');
				  const dirPath = path.resolve(parent, dir);
				  if (!fs.existsSync(dirPath)) {
				    fs.mkdirSync(dirPath);
				  }
				});
            }
        }
    }
}


// Create dir recursively if it does not exist!
const targetDir = 'path/to/dir';



var styles = {
	//styles
	'bold': [1, 22],
	'italic': [3, 23],
	'underline': [4, 24],
	'inverse': [7, 27],
	//grayscale
	'white': [37, 39],
	'grey': [90, 39],
	'black': [90, 39],
	//colors
	'blue': [34, 39],
	'cyan': [36, 39],
	'green': [32, 39],
	'magenta': [35, 39],
	'red': [31, 39],
	'yellow': [33, 39]
};

var colours = {
	'all': "grey",
	'trace': "blue",
	'debug': "cyan",
	'info': "green",
	'warn': "yellow",
	'error': "red",
	'fatal': "magenta",
	'off': "grey"
};

module.exports = {
	configure: configure,
	getLogger: getLogger,
	getLog4js: getLog4js,
	createLogDir: createLogDir
};