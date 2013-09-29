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


##配置路由

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

设置页面切换时的动画：

页面切换默认无动画，仅需要配置列表页至详情页的动画为`slider`:

```javascript
   "pageTransition: {
      "index-detail" : "slider"
   }
```

##代码实现


