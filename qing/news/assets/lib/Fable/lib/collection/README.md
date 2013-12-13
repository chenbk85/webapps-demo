#Pattern:collection模块说明

##是什么

`collection`为Pattern模块集提供集合操作的能力，你还可以监听到集合的变化。

##怎么用

最简单的例子：

```javascript

var collection = require( './collection' ),
    c1;
    
//这样就可以创建一个新的集合
c1 = collection.define().create();


c1.add( 'xxx' );

```

使用事件监听的例子：

```javascript
var collection = require( './collection' ),
    c1;
    
//这样就可以创建一个新的集合
c1 = collection.define().create();
c1.on( 'add', function( event, params ){ 
  //todo
} );

//will trigger add
c1.add( 'xxx' );
```

##API

###事件

对应的调用方法的opts参数可以明确指定取消对应事件的监听。

1. add
   
   调用方法add/append/prepend时触发   

2. remove

   调用方法remove时触发

3. sort

   调用方法sortBy时触发

4. clear

   调用方法clear时触发

###API

####length

获取集合item数量

####add( items, opts )

向集合添加item(一个或多个)

`opts.at`:添加位置索引，默认为追加至后面

`opts.silent`: 是否触发add事件，默认为true

####append( items, opts )

向集合末端追加item( 一个或多个 )

此时opts.at参数会被忽略

####prepend( items, opts )

向集合首端追加item( 一个或多个 )

此时opts.at参数会被忽略

####addTo(targetCollection)

将当前集合添加至另一个集合，返回目标集合

####remove( items, opts )

从集合中移除item

####get( key )

查询符合条件的集合，类似于getById/getByIndex

`key(int)`: int类型将执行索引检索

`key(string)`: string类型将执行item.id==key检索

####pluck( attrs )

查询集合的item的所有key的值，返回这些值的数组。

`attrs(string)`:检索item[attrs]的所有值

`attrs(array)`:检索item[attr1,attr2,...]的所有值

####clear( opts )

将集合length清0

####each(fn)

迭代集合的item

`fn`: 迭代器，被调用时传递的参数是( item, key )

####sortBy( key, opts )

对集合的item重新排序

`key`: 按照item[ key ]值排序
