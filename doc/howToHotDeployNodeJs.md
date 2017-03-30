### 使用supervisor进行hot deploy


#### 简介
在开发nodejs程序,调试的时候,无论你修改了代码的哪一部分,都需要重启服务才能生效.这是因为Node.js只有在第一次引用到某部份时才会去解析脚本文件,以后都会直接访问内存,避免重复载入.Node.js的这种设计虽然有利于提高性能,却不利于开发调试,因为我们在开发过程中总是希望修改后立即看到效果,而不是每次都要终止进程并重启.supervisor可以帮助你实现这个功能,它会监视你对代码的改动,并自动重启Node.js。
supervisor极大的提高了调试阶段的生产效率,让开发者专注于代码问题而非反复的重启.

#### 安装

```shell
[root@localhost miniGameServer]# npm install supervisor -g
```

#### 运行情况

```shell
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
crashing child  				<=====在这一时刻我修改了文件并存档,supervisor立刻探测到改动重启了node反应很快
Starting child process with 'node index.js'
@ /sample/action1
@ /sample/action2
@ /sample/action3
@ /user/regist
@ /user/auth
game server listening on port 3008
pid=2619
```