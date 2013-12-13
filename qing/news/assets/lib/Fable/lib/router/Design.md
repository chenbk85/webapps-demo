#Router模块API设计

##原则

1. 不暴露任何命名空间，仅暴露相关API。
2. 使用AMD规范,采用模块化的方式。
3. 能结合Mixin模块，将功能复制给其它模块
4. 分层设计，Router仅处理核心功能，其它的比如`hash`或则`pushstate`都由新模块来做。


##API设计

1. Module.`register`( rules )
2. Module.`start`()
3. Module.`stop`()
4. Module.`navigate`( fragments )

##API详细

###1. register

`init`方法主要用来注册rulr规则，如：

```javascript

var router = require( '../router' ),
    rules = {
         '#view/:id' : callback
    };
    
router.register( rules );

```

`rules`参数如下描述：

```javascript
    {
         '#view/:id' : callback
    };
```

兼容***Backbone.js***的router规则。

支持相同规则的重复绑定。

###2.start

`start`方法主要用来启动URL Change的监听，此后的URL Change将开始匹配

###3. stop

`stop`方法主要用来停止相关规则(参数为空表示全部)的匹配。


###4. navigate

`navigate`方法主要用来变更URL


##相关扩展模块

###hash

`hash`模块主要是`hash`相关的具体实现

###pushstate

`pushState`模块主要是`pushState`相关的具体实现

