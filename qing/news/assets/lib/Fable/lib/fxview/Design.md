#FXView模块API设计

##原则

1. 不暴露任何命名空间，仅暴露相关API。
2. 使用AMD规范,采用模块化的方式。
3. 能结合Mixin模块，将功能复制给其它模块
4. 分层设计，FXView保持核心功能，其它动画扩展都由新模块来做。



##主要功能描述

###常见功能

1. animation
2. simple


###默认动画

当需要使用的扩展动画类型不存在时，将使用默认的动画类型`simple`.

##API设计

1. Module.`animation`( type, options )
2. Module.`simple`( options )


##API详细

###1. animation

动画的目标对象需要是一个***DOM类型***或可通过`el`属性获取到的DOM类型。(默认支持原生获取和jQ获取)

所以`FXView`不仅可以针对DOM类的对象做动画，也可以对非DOM类的对象做动画(前提是可以提取到它的DOM引用)。


`options`参数如下这样：

```javascript
{
    //源
    from : ViewA,
    
    //目标
    to   : ViewB,
    
    //方向 左至右，上至下，无至有，为1，其它0
    dir  : 1,
    
    //callback，
    end  : callback
}

```

比如，可以这样来使用：

```javascript

var FXView = require( '../fxview' ),
    event  = require( '../event' ),
    ViewA,
    ViewB;
    
    ViewA = {
        el : '#viewA'
    };
    ViewB = {
        el : '#viewB'
    };
    
    event.mixto(ViewA,ViewB);
    
    ViewA.on( {
        
        beforeViewIn  : callback,
        beforeViewOut : callback,
        afterViewIn   : callback,
        afterViewOut  : callback
    
    } );
    ViewB.on( {
        
        beforeViewIn  : callback,
        beforeViewOut : callback,
        afterViewIn   : callback,
        afterViewOut  : callback
    
    } );
    
    FXView.animation( 'slider', {
        from : ViewA,
        to   : ViewB,
        dir  : 1,
        end  : callback
    });
```

###2. simple


`simple`方法本质上是`animation`方法的第一个参数为`simple`的简写：

```javascript

//Module.animation( 'simple', config )

//等同于上面的写法
Module.simple( config );


```


##相关扩展模块

###slider

`slider`类型的动画扩展，`mixin`到`FXView`上后使得`FXView`具有`slider`方法

###fade

`fade`类型的动画扩展，`mixin`到`FXView`上后使得`FXView`具有`fade`方法

###dropdown

`dropdown`类型的动画扩展，`mixin`到`FXView`上后使得`FXView`具有`dropdown`方法
