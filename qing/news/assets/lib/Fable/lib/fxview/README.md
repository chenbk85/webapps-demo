#Pattern:fxview模块说明

##是什么

`fxview`模块为Pattern模块集提供切换动画的能力。

##怎么用

简单的例子：

```javascript
var fxview = require( './fxview' ),
    v1,
    v2;
    
v1 = {
    el : '#A'
};

v2 = {
    el : '#B'
};

fxview.animation( 'simple', {
    from : v1,
    to   : v2,
	dir  : 0,
	end  : function(){
		//todo		
    } );
```

也可以简写为：
```javascript
var fxview = require( './fxview' ),
    v1,
    v2;
    
v1 = {
    el : '#A'
};

v2 = {
    el : '#B'
};

fxview.simple( {
    from : v1,
    to   : v2,
	dir  : 0,
	end  : function(){
		//todo		
    } );
```


##API

###动画类型

目前已有4种动画类型：

1. simple( 核心支持 )
2. silder
3. fade
4. dropdown

如果你有新的动画需求，可以查看这些插件的实现方式。

###属性配置

####from
动画的起始对象

该对象仅有以下任一要求：

1. 该对象本身是原生NODE节点
2. 该对象是jQuery包装的NODE节点
3. 该对象的el属性是1或2中任一种

####to
动画的结束对象

####dir
动画顺序，0表示正向：左至右，上至下，无至右。

####end
动画结束时的回调


