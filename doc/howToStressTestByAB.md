### 本文档描述了如何使用apache的压力测试工具ab来对http服务器性能测试

#### 安装apache  
~~~shell
[root@localhost ~]# yum install httpd -y
~~~

#### 找到ab  
~~~shell
[root@localhost ~]# cd /usr/bin
~~~

#### 简单使用ab进行访问测试
~~~shell
[root@localhost /usr/bin]# ./ab -n1000-c100 http://127.0.0.1/sample/action1
//n为请求次数,c代表并发数
~~~

#### 查看负载

-	top 

	1.作用  
	top命令用来显示执行中的程序进程.使用权限是所有用户.  
	2.格式  
	top [－] [d delay] [q] [c] [S] [s] [i] [n]  
	3.主要参数  
	d：指定更新的间隔，以秒计算.  
	q：没有任何延迟的更新．如果使用者有超级用户，则top命令将会以最高的优先序执行．  
	c：显示进程完整的路径与名称．  
	S：累积模式，会将己完成或消失的子行程的CPU时间累积起来．  
	s：安全模式．  
	i：不显示任何闲置(Idle)或无用(Zombie)的行程．  
	n：显示更新的次数，完成后将会退出top．  

~~~shell
[root@localhost bin]# top -d3
  PID USER      PR  NI  VIRT  RES  SHR S %CPU %MEM    TIME+  COMMAND
    1 root      20   0 19232 1500 1228 S  0.0  0.1   0:01.26 init
    2 root      20   0     0    0    0 S  0.0  0.0   0:00.01 kthreadd
    3 root      RT   0     0    0    0 S  0.0  0.0   0:00.00 migration/0
    4 root      20   0     0    0    0 S  0.0  0.0   0:00.04 ksoftirqd/0
    5 root      RT   0     0    0    0 S  0.0  0.0   0:00.00 migration/0
    6 root      RT   0     0    0    0 S  0.0  0.0   0:00.02 watchdog/0
    7 root      20   0     0    0    0 S  0.0  0.0   0:03.06 events/0
    8 root      20   0     0    0    0 S  0.0  0.0   0:00.00 cgroup
    9 root      20   0     0    0    0 S  0.0  0.0   0:00.00 khelper
   10 root      20   0     0    0    0 S  0.0  0.0   0:00.00 netns
   11 root      20   0     0    0    0 S  0.0  0.0   0:00.00 async/mgr
   12 root      20   0     0    0    0 S  0.0  0.0   0:00.00 pm
   13 root      20   0     0    0    0 S  0.0  0.0   0:00.04 sync_supers
   14 root      20   0     0    0    0 S  0.0  0.0   0:00.04 bdi-default
   15 root      20   0     0    0    0 S  0.0  0.0   0:00.00 kintegrityd/0
~~~

-	free

	1.作用  
	free命令用来显示内存的使用情况，使用权限是所有用户．比top轻量,但是只能看内存.
	2.格式  
	free [－b－k－m] [－o] [－s delay] [－t] [－V]  
	3.主要参数  
	b －k －m：分别以字节（KB、MB）为单位显示内存使用情况．  
	s delay：显示每隔多少秒数来显示一次内存使用情况．  
	t：显示内存总和列．  
	o：不显示缓冲区调节列．  

~~~shell
[root@localhost bin]# free -m -s3
             total       used       free     shared    buffers     cached
Mem:           996        515        481          0         67        270
-/+ buffers/cache:        177        819
Swap:         2015          0       2015

             total       used       free     shared    buffers     cached
Mem:           996        515        481          0         67        270
-/+ buffers/cache:        177        819
Swap:         2015          0       2015
~~~

