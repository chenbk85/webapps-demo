#模块化之轻量级webapp框架

[预览](http://webappdemos.duapp.com/swords/demo/index.html)

对于一个简单的产品，我们可能只需要以下功能：

1. 很薄的view层
2. Router驱动
3. 动画效果


如果对Backbone.js这类框架做改造，则需要移除的部分比较多，有些部分盘根错节很难在短时间内搞定。有些东西还不支持，比如动画。

`Pattern`项目就是为了解决这类问题：将MVC这类的框架分解为独立的模块，然后根据自己的业务特点，设计自己的框架模式(MVC,MVR,MVVM...)并快速实现。

对于本文所提及的需求，使用`Pattern`模块组合起来相当简单。只需要少量的代码就可以实现一个非常轻量的webapp框架(GZIP后大概**3K**)。


##设计

在设计之前，我们先看看未来我们如何利用这个框架写自己的业务代码：

```javascript
define( 
	
	[
		'Chassis/index'
	],
	
	
	function( Chassis ) {
		
		Chassis.Page.index = Chassis.View.define( {
			
			el : '#index',
			
			init : function(){
				$( '#goDetail' ).click( function(){
					var a = 1;
					a++;
					
					
					
					Chassis.router.navigate( 'detail' );
				} );
			},
			
			onBeforeViewIn : function(){
				console.log( 'index before in' );
			},
			
			onBeforeViewOut : function(){
				console.log( 'index before out' );
				$('#absolute').hide();
			},
			
			onAfterViewIn : function(){
				console.log( 'index after in' );
				$('#absolute').show();
			},
			
			onAfterViewOut : function(){
				console.log( 'index after out' );
				
			}
			
		} );
		
		Chassis.Page.info = Chassis.View.define( {
		
			el : '#info',
			
			init : function(){
				console.log( 'detail init' );
			},
			
			onBeforeViewIn : function(){
				console.log( 'detail before in' );
			},
			
			onBeforeViewOut : function(){
				console.log( 'detail before out' );
			},
			
			onAfterViewIn : function(){
				console.log( 'detail after in' );
			},
			
			onAfterViewOut : function(){
				console.log( 'detail after out' );
			}
		} );
		
		Chassis.Page.about = Chassis.View.define( {
		
			el : '#aboutEl',
			
			init : function(){
				console.log( 'about init' );
			},
			
			onBeforeViewIn : function(){
				console.log( 'about before in' );
			},
			
			onBeforeViewOut : function(){
				console.log( 'about before out' );
			},
			
			onAfterViewIn : function(){
				console.log( 'about after in' );
			},
			
			onAfterViewOut : function(){
				console.log( 'about after out' );
			}
		} );
		
		Chassis.router = Chassis.Router.set( {
			
			rules : {
				''       : 'index',
				'detail' : 'info',
				'about'  : 'about'
			},
			
			defaultPageTransition : 'simple',
			enablePositionRestore : true,
			pageTransition : {
				'index-info' : 'slider',
				'index-about' : 'slider',
				'info-about' : 'slider'
			},
			pageOrder : [
				'index',
				'info',
				'about'
			],
			getPageClass : function( action ) {
				return Chassis.Page[ action ];
			}
		
		} ).create();
		
		
		Chassis.router.start();
} );
```

简单来说，就是：

1. 定义view
2. 配置路由
3. start

所以在框架的设计上，主要分两个主体：

1. Router
2. View

他们互相保持独立，通过事件的方式来产生联系。

而动画仅是变化时的甜点。


我们已经有了对应的模块：

1. 用于核心事件驱动的event
2. 一层很薄的view
3. 动画切换效果fxview
4. 路由控制模块router

然后让`Router`和`View`产生联系即可。

##实现

首先创建新模块`Chassis/index`，大致的代码框架是这样的：

```javascript
define( 
	
	//引入需要的模块
	[
		'base/index',
		'mixin/index',
		'event/index',
		'fxview/index',
		'view/index',
		'router/index'
	],
	
	function( base, mixin, event, fxview, view, router ) {
	    var Chassis;
	    
	    //包装后整体返回
		var Chassis = {},
			instance = {};
		
		Chassis.View  = view;
		Chassis.Event = event;
		Chassis.Base  = base;
		Chassis.Mixin = mixin;
		Chassis.Page  = {};
		  
		  //将Router和View两个模块联系起来 TODO
	    
	    return Chassis
	
	}
)
```

现在我们将`View`和`Router`通过事件机制联系起来，否则路由发生变化时我们什么也不能做，因为它们彼此是独立的。

`Router`提供了一个`onRouterChanged`接口，我们只需要在里面写上自己的逻辑即可：

```javascript

		Chassis.Router = router.define( {
			
			onRouterChanged : function( event, params ) {
				var me = this,
					setting,
					fx;
				
				
				base.each( [ params.from, params.to ], function( item, key ) {
					item &&
						!instance[ item ] &&
							( instance[ item ] = 
								new ( me.getPageClass( item ) )( params.params ) );
				} );
	
				setting = {
					from : instance[ params.from ],
					to   : instance[ params.to ],
					dir  : base.indexOf( me.pageOrder, params.to ) > 
							base.indexOf( me.pageOrder, params.from ) ? 1:0,
					end  : function() {
						
						setting.from && setting.from.trigger( 'afterViewOut', params );
						setting.to   && setting.to.trigger( 'afterViewIn', params );
					}
				
				};
				
				setting.from && setting.from.trigger( 'beforeViewOut', params );
				setting.to   && setting.to.trigger( 'beforeViewIn', params );
				
				fx = me.pageTransition[ params.from + '-' + params.to ] || 
							me.pageTransition[ params.to + '-' + params.from ];
				
				
				fxview.animation( fx || 'simple', setting );
			}
		
		} );


```

就这样简单，通过很少的代码组合就可以实现我们的需求。



TODO

目前动画还不能支持位置记忆。

之前基于绝对定位是可以很好的处理位置记忆问题，但是绝对定位会带来新的问题。

故，新的动画没有采用绝对定位，使用标记的方式处理位置记忆会闪烁，故等有新方案后再补充。
