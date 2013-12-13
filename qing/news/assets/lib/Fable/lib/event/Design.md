#Event模块API设计

##原则

1. 不暴露任何命名空间，仅暴露相关API。
2. 使用AMD规范,采用模块化的方式。
3. 能结合Mixin模块，将功能复制给其它模块
4. 分层设计，events保持核心功能，其它扩展都由新模块来做。

##主要功能描述

###常见功能

1. on
2. off
3. once
4. trigger


###解决僵尸问题的接口

1. listenTo
2. listenToOnce
3. stopListening

###namespace功能

namespace功能主要是为了解决`off`事件时批量的简便

比如：


```javascript
var events   = require( './events' ),
    blog     = {},
    callback = function(){};
    
    
    events.mixto( blog );
    
    
    blog.on( 'eventA.class1', callback );
    
    blog.on( 'eventB.class1', callback );
    
    
    //仅off eventA
    blog.off( 'eventA' );
    
    //off class1这类的所有事件
    blog.off( '.class1' );
    
    //off blog上的所有事件
    blog.off();
```

###链式操作

模块支持链式操作，比如：

```javascript
var event = require( '../event' ),
    blog  = {};
    
event.mixto( blog );

blog.on( 'read', function( event, param ){
            //todo
        } )
    .on( 'write', function( event, param ){
           //todo
        } );

```

##API设计

* Module.`on`(event, callback, [context])
* Module.`off`([event], [callback], [context])
* Module.`once`(event, callback, [context])
* Module.`trigger`(event, [*args])
* Module.`stopListening`([other], [event], [callback])
* Module.`listenTo`(other, event, callback)
* Module.`listenToOnce`(other, event, callback)


##API详细

###1. on

**添加自定义事件**

 
第一个参数event可以可以使用4种方式表达  
1. Module.on( 'eventA,eventB', callback )  
2. Module.on( 'eventA eventB', callback )  
3. Module.on( ['eventA','eventB'], callback )  
4. Module.on( {eventA:callback,eventB:callback}, context )

另外，它有一个特殊的事件名称'`all`'，表示所有事件触发后都会再触发它

Module.on( 'all', callback, context )

`callback`会自动传入两个参数，代码上表现为：

```javascript

/**
 * event是一个包装了事件类型、触发源等上下文信息
 *
 * params是trigger传入的第二个参数
 */
function( event, params ){

}
```




###2. off

**删除自定义事件**

第一个参数的形式和`on`相同。

另外，如果没有任何参数，表示将删除所有自定义事件。  
1. Module.off( )


###3. once

**添加只执行一次的自定义事件**

第一个参数形式和`on`相同

它也有一个事件名称为'`all`'，但是，任意事件执行时仅触发它一次。


###4. trigger

**派发自定义事件**

第一个参数形式和`on`相同


###5. listenTo

**添加一个观察对象**

建议使用listenTo替代on，因为它可以很方便的解决僵尸问题。

比如：  
view.listenTo(model, 'change', view.render);

###6. listenToOnce

**添加一个仅执行一次的观察对象**

同listenTo，但仅执行一次。

###7. stopListening

**删除添加的观察对象**


##相关扩展模块

###promise功能(独立模块)

    相关API及设计在新文档中说明。

举例说明：

```javascript
var eventsPromise = require( './eventspromise' ),
    blog          = {
        say : function(){}
    },
    callback      = function(){};
    
    eventsPromise.mixto( blog );
    
    //blog 变成了一个deferred对象
    
    blog.promise();
    
    blog.resolve();
    
    blog.done(function(){
    
        })
        .say();
    
```

###DOM事件注册(独立模块)

    相关API及设计在新文档中说明。

单独开模块实现DOM事件注册功能(实现View的events。)

比如实现这种注册方式：

```javascript
{
    "click #domA"     : "eventHandlerA",
    "mouseover #domB" : "eventHandlerB"
}
```

需要注意，DOM上的注册事件使用`live`的方式。

具体使用方式是：

```javascript
var domEvents = require( './domevents' ),
    viewEvents = {
        "click #domA"     : "eventHandlerA"
    };
    
    
    domEvents.register( viewEvents );
    
    
```
