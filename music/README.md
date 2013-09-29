##初始化webapp

下载npm辅助工具`fis-chassis`：

```
npm install -g fis-chassis
```

新建项目目录：

```
md wallpaper
cd wallpaper
```

初始化webapp：

```
fisc release
```

根据命令提示即可完成webapp的初始化。此时webapp的脚手架已经搭建完毕。


##配置路由及动画

###路由
首先分析下需要哪些页面：

1. 壁纸列表页

   ```javascript
   {
       ''           : 'index',
       'index'      : 'index',
       'index/:tag' : 'index'
   }
   ```

2. 壁纸详情页

   ```javascript
   {
       'detail/:tag/:index' : 'detail'
   }
   ```

3. 封面

   ```javascript
   {
       'cover' : 'cover'
   }
   ```

4. 添加到`主屏幕`的页面

   ```javascript
   {
       'install' : 'install'
   }
   ```


5. 非iPhone浏览器的提示页面

   ```javascript
   {
       'iphone' : 'iphone'
   }
   ```

###动画

设置页面切换时的动画：

页面切换默认无动画，仅需要配置列表页至详情页的动画为`slider`:

```javascript
   "pageTransition: {
      "index-detail" : "slider"
   }
```

###写入配置

将上述的配置写入`/fis-conf.js`，最终的配置如下：

```javascript
fis.config.merge({
    chassis : {
		home   : 'index.html',
		router : {
			"routes" : {
				""                  : "index",
				"index/:tag"        : "index",
				"detail/:tag/:i"    : "detail",
				"cover"             : "cover",
				"install"           : "install"
			},
			
			"defaultPageTransition" : "simple",
			
			"enablePositionRestore" : true,
			
			"pageTransition" : {
				"index-detail" : "slide",
				"cover-index"  : "slider"
			}
		}
	}
});
```

注意，`fis-conf.js`的内容要求是一个符合`JSON`规范的配置文件，所以注意单双引号。


###生成对应的`page`脚手架

配置完毕后，需要让其生效，以生成对应的`page`脚手架，方便后续具体业务逻辑的实现：

```javascript
fisc release
```

根据提示完成即可。

此时，`page/`目录下已经生成了对应的脚手架目录及文件。后续我们只需要填充对应的业务逻辑即可。


##代码实现

###起始页面

webapp启动时，需要将第一屏设置为`cover`封面页，打开`/js/init.js`，在`init`入口处写上以下逻辑：
```javascript
var destPage;

if (window.navigator.userAgent.indexOf('iPhone') != -1) {
	if (window.navigator.standalone == true) {
		hash = 'cover';
	}else{
		hash = 'install';
	}
}else{
	hash = 'iphone';
}

location.hash = destPage;
```




