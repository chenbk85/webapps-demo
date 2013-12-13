// ==========================================
// Copyright 2013 Baidu, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define( 
	
	[
		'view/index',
		'mixin/index',
		'event/index'
	],
	
	function( view, mixin, event ){
		

		
		module('Iron.Module.view');
		

		
		asyncTest('get', 2, function() {
			var viewClass,
				v1;
			viewClass = view.define( {
				id : 'hello'
			}  );
			v1 = viewClass.create();
			
			equal( v1.id, 'hello' );
			equal( view.get( v1.id ), v1 );
						
			start();
			

		});
		
		asyncTest('view', 2, function() {
			var viewClass,
				v1;
			viewClass = view.define( {
				init : function(){
					ok( true );
				},
				
				onBeforeViewIn : function(){
					ok( true );
					start();
				}
			}  );
			v1 = viewClass.create();
			
			v1.trigger( 'beforeViewIn' );

		});
		
		asyncTest('stamp', 2, function() {
			var viewClass,
				v1,
				v2;
				
			viewClass = view.define( {

				stamp : ':a/:b'
				
			}  );
			v1 = viewClass.create( {a:1,b:2} );
			v2 = viewClass.create( {a:1,b:2} );

			equal( v1._stampString, '1/2' );
			
			equal( v1, v2 ); //确保不会创建新的实例
			start();

		});
		
		//测试事件往子节点派发
		asyncTest('collection', 2, function() {
			var viewClass1,
				viewClass2,
				v1,
				v2;
				
			viewClass1 = view.define( {

				onBeforeViewIn : function() {
					ok( true );
				}
				
			}  );
			
			viewClass2 = view.define( {

				onBeforeViewIn : function() {
					ok( true );
				}
				
			}  );
			v1 = viewClass1.create( {a:1,b:2} );
			
			v2 = viewClass2.create( {a:1,b:2} );
			
			v2.addTo( v1 );
			
			v1.trigger( 'beforeViewIn' );
			
			start();

		});
		
		asyncTest('commonView', 4, function() {
			var counter = 0,
				viewClass1,
				viewClass2,
				viewClass3,
				v1,
				v2,
				v3;
				
			viewClass1 = view.define( {

				onBeforeViewIn : function() {
					counter++;
				}
				
			}  );
			
			viewClass2 = view.define( {

				onBeforeViewIn : function() {
					counter++;
				}
				
			}  );
			
			viewClass3 = view.define( {

				onBeforeViewIn : function() {
					counter++;
				},
				
				onAfterViewIn : function(){
					counter++;
				}
				
			}  );
			v1 = viewClass1.create( {a:1,b:2} );
			
			v2 = viewClass2.create( {a:1,b:2} );
			
			v3 = viewClass3.create( {a:1,b:2} );
			
			v3.addTo( v1 );
			v3.addTo( v2 );
			
			v1.trigger( 'beforeViewIn' );
			equal( counter, 2 );
			v2.trigger( 'afterViewIn' );
			equal( counter, 2 );
			
			v2.trigger( 'beforeViewIn' );
			equal( counter, 4 );
			v2.trigger( 'afterViewIn' );
			equal( counter, 5 );
			
			start();

		});
		

		
		asyncTest('plug:module', 3, function() {
			var viewClass,
				v1;
			
			var plugin = function(  ) {
			
				var demo = function( view ) {
					this.listenTo( view, '_create:plugin', function(){
						ok( true );
					} );
				};
				
				event.mixto( demo.prototype )
					 .mixin( {
						unRegister : function(){
							this.stopListening();
						}
					 }  );
				
				return {
					registerTo : function( view ) {
						return view.register( demo );
						
					}
				}
			};
		
			var plugInstance = plugin()[ 'registerTo' ]( view );
		
			viewClass = view.define( {
				id : 'hello'
			}  );
			v1 = viewClass.create();
			
			equal( v1.id, 'hello' );
			equal( view.get( v1.id ), v1 );
			
			plugInstance.unRegister();
			
			start();
			

		});
		
		asyncTest('plugin:instance', 3, function() {
			var viewClass,
				v1;
			
			var plugin = function( ) {
			
				var mgr = function( view ) {
					this.listenTo( view, '_beforeViewIn:plugin',  this.beforeViewIn );
				};
				
				event.mixto( mgr.prototype )
					 .mixin( {
						beforeViewIn : function() {
							ok( true );
						},
						
						unRegister : function() {
							this.stopListening();
						}
					} );
				
				return {
					
					//两种注册方式。1是全局，2是实例
					registerTo : function( view ) {
						return view.register( mgr );
					}
				}
			};
			
			viewClass = view.define( {
				init : function() {
					ok( true );
				},
				
				onBeforeViewIn : function() {
					ok( true );
					plugInstance.unRegister();
					start();
				}
			}  );
			
			v1 = viewClass.create();
			var plugInstance = plugin()['registerTo']( v1 );
			
			v1.trigger( 'beforeViewIn' );
			
			

		});
		
		
		
		
	}
);