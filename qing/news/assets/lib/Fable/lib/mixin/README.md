#支持链式调用的mixin

##特点

1. 支持链式调用的mixin
2. 新增语义化的mixto接口
3. 新增是否限定覆写参数


##使用

直接看故事：

```javascript
var mixin = require( './mixin' ),
    cock = {
        crow : function(){ 
            console.log( 'I can crow!' );
        }
    },
    hen = {
        egg : function(){
            console.log( 'I can eggs!' );
        }
    };
    
mixin( cock, hen );
    
cock.egg(); //一只能叫你起床又能给你蛋吃的怪兽诞生了
    
```

有一天这只怪兽看到了鸭子：

```javascript

var duck = {
    swimming : function(){
        console.log( 'I can swimming!' );
    }
};

cock.mixin( duck ); //现在它还会下水了。

```

它又遇见很多具有特异功能的怪物：

```javascript
cock
    .mixin( mouse )
    .mixin( bird )
    .mixin( cat, lion );
```

怪兽在一天天的时光里变老了，它决定把它毕生所学传给你:

```javascript
var you = {
    coding : function(){
        console.log( "I'm busy!" );
    }
};

cock.mixto( you ); //你NB了
```

你又把它传给了你的孩子A、孩子B、孩子C...如果你不怕罚款的话:
```javascript
you
    .mixto( childrenA )
    .mixto( childrenB )
    .mixto( childrenC, childrenD, childrenE );
```

现在的孩子都很聪明，在外面学会了泡姑娘等，这些技能比你的先进，所以你只好跳过他们学过的：

```javascript

you.mixto( childrenX, childrenY, childrenZ, false );
```

嗯，偶尔可以尝试下返祖：

```javascript

you.mixin( {
    crow : function(){
        this._owner.crow();
        console.log( 'distant memory...' );
    }
} );

```

