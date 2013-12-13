#自定义事件模块 --- Event

##特点

1. 支持链式调用
2. 支持事件命名空间
3. 支持单事件多回调，且回调链可控
4. 可实现all.before和all.after( all.after就是all)


##如何使用

直接看代码：

```javascript
var event = require( './event' ),
    blog  = {};
    
event.mixto( blog );

blog
    .on( 'write,manage delete', function( event, params ){
        
        //return false后后面的write/manage/delete都不会被执行。
        if (isNotAdmin( params.user )) {
            return false;
        }
    } )
    .on( 'read', function( event, params ){
        //todo something
    } )
    .on( 'write', function( event, params ){
        //todo something
    } );

blog.trigger( 'read', {id:10} );

```

##API

* Module.`on`(event, callback, [context])
* Module.`off`([event], [callback], [context])
* Module.`once`(event, callback, [context])
* Module.`trigger`(event, [*args])
* Module.`stopListening`([other], [event], [callback])
* Module.`listenTo`(other, event, callback)
* Module.`listenToOnce`(other, event, callback)

###on

Module.`on`(event, callback, [context])

给Module添加自定义类型的事件监听。

第一个参数event可以可以使用4种方式表达  
1. Module.on( 'eventA,eventB', callback )  
2. Module.on( 'eventA eventB', callback )  
3. Module.on( ['eventA','eventB'], callback )  
4. Module.on( {eventA:callback,eventB:callback}, context )

另外，它有一个特殊的事件名称'`all`'，表示所有事件触发后都会再触发它。如果你需要前置触发，可以使用'`all.before`'。所以，如果你off( 'all' )，则只会取消后置事件监听。

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

同名的事件名称可以多次添加不同的事件监听。它们触发的顺序按照定义的先后顺序执行。如果某个callback明确的返回`false`值，则该名称事件的队列就会终止。


###once

Module.`once`(event, callback, [context])

给Module添加自定义的一次性的事件监听。

###off

Module.`off`([event], [callback], [context])

取消Module的自定义的事件监听。

`off()`会取消自己所有的自定义的事件监听，包括`all`后置事件和`all.before`前置事件。

###trigger

Module.`trigger`(event, [*args])

触发Module的自定义的事件监听。

`args`被传递给callback的第二个参数。

###listenTo

Module.`listenTo`(other, event, callback)

###listenToOnce

Module.`listenToOnce`(other, event, callback)

###stopListening

Module.`stopListening`([other], [event], [callback])


##事件命名空间

你可以将一些事件归类，以便很方便的批量管理它们。事件命名空间使用字符`:`或`.`来分割，如：

```javascript
blog.on( 'read:news', ... )
    .on( 'write:news', ... )
```

你可以批量的触发命名空间`news`下的所有事件，也可以批量的取消它们：
```javascript
blog.off( ':news' );
```

`all`事件本质上就是`all.after`的缩写。

