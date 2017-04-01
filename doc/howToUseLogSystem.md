### 日志系统使用说明V0.1

#### 简介

-   基于log4js

安装log4js
```
    npm install log4js 
```


#### 部署日志系统


```shell
├── config
│   ├── index.js
│	├── log4js.json
│	└── package.json
└── logger
	├── index.js
	├── logger.js
	└── package.json
```

-	config文件夹  
存放log4js的配置信息,可根据项目调整目录结构.

*log4js.json*

~~~JSON
{
    "type": "dateFile",             //log的type,此例为文件形式
    "filename": "./logs/logger",    //指定日志文件存储路径
    "maxLogSize": 1048576,          //文件最大大小 传奇的是设置到了很大
    "pattern": "_yyyy-MM-dd.log",   //文件后缀,最终得到的结果是 <filename><pattern>,如logger_1982-03-09.log
    "alwaysIncludePattern": true,   //是否使用后缀,上面都设置了,这个就选择true吧
    "layout": {                     //Layout实现每条日志记录的格式化,一般情况basic就够用了
      "type": "basic"
    },
    "backups": 5,                   //文件个数上限,超出了会滚动覆盖
    "category": "logger"            //分类的名字,在此例中...getLogger("logger",...取的就是这个值
},
~~~

-	logger文件夹
存放logger的主文件.
logger.js
目前提供
```
`debug', 'info', 'warn', 'error', 'trace', 'fatal'
```
几个级别的log,使用方法见下文.


#### 使用

-	初始化配置  

```javascript
var logger = require('./logger');
var log4jsCfg = require("./config").log4js;
logger.configure(JSON.parse(JSON.stringify(log4jsCfg)));
```

-	调用  

```javascript
var logger = require('../logger').getLogger("logger",__filename);
logger.debug("this is a debug log");
```

-	打印的log

```shell
[2017-04-01 15:26:58.161] [DEBUG] logger - [D:\log4jstest\app\routes\index.js] this is a debug log
```

