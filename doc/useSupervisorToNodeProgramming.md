### 使用supervisor


#### 安装

~~~shell
[root@localhost miniGameServer]# npm install supervisor -g
~~~

#### 运行情况

~~~shell
[root@localhost miniGameServer]# supervisor index.js

Running node-supervisor with
  program 'index.js'
  --watch '.'
  --extensions 'node,js'
  --exec 'node'

Starting child process with 'node index.js'
Watching directory '/root/miniGameServer' for changes.
Press rs for restarting the process.
@ /sample/action1
@ /sample/action2
@ /sample/action3
@ /user/regist
@ /user/auth
game server listening on port 3008
pid=2605
crashing child  		<=====在这一时刻我改文件存档了,反应很快
Starting child process with 'node index.js'
@ /sample/action1
@ /sample/action2
@ /sample/action3
@ /user/regist
@ /user/auth
game server listening on port 3008
pid=2619
~~~