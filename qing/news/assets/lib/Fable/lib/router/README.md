#Pattern:router模块说明

##是什么

`router`为Pattern模块集提供路由驱动的能力，你还可以监听到集合的变化。

##怎么用

简单的例子：

```javascript
var router = require( './router' ),
    r1;
    
r1 = router.define( {
    rules : {
        ''           : 'index',
        'detail/:id' : 'detail'
    },
    
    index : function(){},
    
    detail : function( id ){}

} ).create();

router.start(); //等同于r1.start()
```
##API

###id

当前实例的id，默认随机分配。

###type

路由类型，默认值为hash。你也可以使用pushState。

###init( param )

实例化时的初始化函数

###start()

启动URL监听

###stop()

停止URL监听并清空所有规则

###navigate( fragment, opts )

导航到另一URL

###addRules( rules )

添加新的规则

###onRouterChanged()

URL变化时触发
