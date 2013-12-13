#Mixin模块API设计

##原则

1. 不暴露任何命名空间，仅暴露相关API。
2. 使用AMD规范,采用模块化的方式。

##API设计

1. Module( src, dest, dest, ... )
2. Module.`mixin`( dest, dest, ... )
3. Module.`mixto`( dest, dest, ... )

##设计明细

mixin使用比较简单：

```javascript
var mixin = require( './mixin' );

var myObjectA = {a:1};
var myObjectB = function(){};

mixin(myObjectB.prototype, myObjectA);

```

或则

```javascript
var mixin = require( './mixin' );

var myObjectA = {a:1};
var myObjectB = function(){};

mixin(myObjectB.prototype);
myObjectB.mixin(myObjectA);
```
