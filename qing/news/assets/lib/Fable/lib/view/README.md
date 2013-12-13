#Pattern:view模块说明

##是什么

`view`为Pattern模块集提供view模块化及其管理的能力，且拥有集合的能力，你还可以监听到这些模块的事件。

##怎么用

简单的例子：
```javascript

var view = require( './view' ),
    v1;
    
v1 = view.define( {

    el: 'xx',
    
    init : function(){},
    
    onBeforeViewIn : function(){}
    
    
} ).create( param );

```

##API

###id

实例的id，默认随机分配。

###el

实例的el属性

###init( param )

初始化方法，在MVC里param中可以获取到URL参数

###onBeforeViewIn

模块显示前触发

###onBeforeViewOut

模块离开前触发

###onAfterViewIn

模块隐藏前触发

###onAfterViewOut

模块隐藏后触发

###destroy

销毁当前模块

###register

实例插件注册

###stamp

stamp标识符，如`:id/:cid`。确保不会创建相同stamp的两个实例(不能define的是可以的)

###max

具有相同标识符的实例的最大个数。超过会被回收。

###event模块相关方法

已mixin event

###collection模块相关方法

已mixin collection

##关于插件

事件驱动的插件机制。


##一些新思想

1. 模块独立，不关心上下层级的状态
2. 模块间沟通使用事件机制
3. 模块倒立式反注册，模块不能决定要添加哪些模块，只可以决定要添加到哪些模块

TODO
