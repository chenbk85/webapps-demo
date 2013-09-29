#壁纸应用开发教程

* [**初始化webapp**](#初始化webapp)
* [**配置路由及动画**](#配置路由及动画)
   * [**路由**](#路由)
   * [**动画**](#动画)
   * [**启动页面**](#启动页面)
   * [**写入配置**](#写入配置)
   * [**生成对应的page脚手架**](#生成对应的page脚手架)
* [**代码实现**](#代码实现)
   * [**封面**](#封面)
   * [**首页列表页**](#首页列表页)
   * [**壁纸详情页**](#壁纸详情页)
   * [**webapp安装页**](#webapp安装页)
   * [**非iphone提示页**](#非iphone提示页)

##初始化webapp

安装chassis命令行辅助工具`fis-chassis`：

```
npm install -g fis-chassis
```

新建项目目录`wallpaper`：

```
mkdir wallpaper
cd wallpaper
```

初始化`wallpaper`：

```
fisc release
```

根据命令提示即可完成`wallpaper`的初始化。此时`wallpaper`的脚手架已经搭建完毕。


##配置路由及动画

###路由
首先分析下需要哪些页面：

1. 壁纸列表页

   ```javascript
   {
       ""           : "index",
       "index"      : "index",
       "index/:tag" : "index"
   }
   ```

2. 壁纸详情页

   ```javascript
   {
       "detail/:tag/:index" : "detail"
   }
   ```

3. 封面

   ```javascript
   {
       "cover" : "cover"
   }
   ```

4. 添加到`主屏幕`的页面

   ```javascript
   {
       "install" : "install"
   }
   ```


5. 非iPhone浏览器的提示页面

   ```javascript
   {
       "iphone" : "iphone"
   }
   ```

###动画

页面切换默认无动画，仅需要配置列表页至详情页的动画为`slider`:

```javascript
   "pageTransition": {
      "index-detail" : "slider"
   }
```

###启动页面

我们的webapp设定为仅在`iPhone`的`standalone`模式下运行


1. 当为非iPhone时将定位至`iphone`路由
2. 如果为非`standalone`模式，将定位至`install`页面
3. 在`iPhone && standalone`下首先显示`cover`封面页

配置如下：

```javascript
{
	"iphone" : {
		"standalone" : "cover",
		"other"      : "install"
	},
	"other"  : "iphone"
}
```

###写入配置

将上述的配置写入`/fis-conf.js`，最终的配置如下：

```javascript
fis.config.merge({
    chassis : {
		home   : 'index.html',
		main   : {
			"iphone" : {
				"standalone" : "cover",
				"other"      : "install"
			},
			"other"  : "iphone"
		},
		
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


###生成对应的page脚手架

配置完毕后，需要让其生效，以生成对应的`page`脚手架，方便后续具体业务逻辑的实现：

```javascript
fisc release
```

根据命令提示完成即可。

此时，`page/`目录下已经生成了对应的脚手架目录及文件。后续我们只需要填充对应的业务逻辑即可。


##代码实现

###封面

封面页面比较简单，单个`pageview`即可完成。

###首页列表页

列表页主要分为左侧的`tag分类`和右侧的`壁纸列表`，所以我们在`/page/index/js/view`下是这么划分的：

1. `pageview.index.js`
2. `subview.index_tag.js`
3. `subview.index_content.js`


`index_tag`和`index_content`两个`subview`由`index`来动态调用。

另外，由于`index_content`还需要`model`来支持动态数据，所以我们需要一个`model`文件：`/page/index/js/model/model.photo.js`。

具体请参考实例中的代码。

###壁纸详情页

由于详情页查看的频率比较高，所以我们对详情页采用`SubPageMgr`来管理，具体的文件划分：

1. `pageview.detail.js`
2. `subview.detail_content.js`
3. `subview.detail_content_item.js`

`detail_content`会根据参数的不同，动态创建`detail_content_item`，而且在必要的时候会执行`清理`


###webapp安装页
同封面，略

###非iphone提示页

同封面，略




