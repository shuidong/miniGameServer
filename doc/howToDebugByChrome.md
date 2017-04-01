### 本文档描述了如何使用chrome来对node.js程序进行调试

#### 安装node-inspector
-	全局安装  
	`$ npm install node-inspector -g`

#### 启动带参数的node
-	启动node
```shell
$ node --debug-brk app.js
```
-	启动inspector
~~~shell
$ node-inspector
Node Inspector v1.0.0
Visit http://127.0.0.1:8080/?port=5858 to start debugging.
~~~

#### 使用chrome访问该网址
-	可以看到调试界面,并可以添加断点