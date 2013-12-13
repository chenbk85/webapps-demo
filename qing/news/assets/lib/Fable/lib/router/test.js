// ==========================================
// Copyright 2013 Baidu, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define( 
	
	[
		'router/index'
	],
	
	function(){
	
		var router = require( 'router/index' );
		module('Iron.Module.router');
		
		asyncTest('init', 2, function() {
			var routerClass,
				r1;
			
			routerClass = router.define( {
				rules : {
					''           : 'index',
					'detail/:id' : 'detail'
				},
				
				index : function(){
					ok( true );
					r1.navigate( 'detail/1' );
				},
				
				detail : function( id ) {
					equal( id, '1' );
					r1.navigate( '', { trigger : false } );
					start();
				}
			} );
			
			//等同于 new routerClass()
			r1 = routerClass.create();
			
			//等同于router.start()
			r1.start();
			

		});			
		
		asyncTest('onRouterChanged', 4, function() {
			var routerClass,
				r1;
			
			routerClass = router.define( {
				rules : {
					''           : 'index',
					'detail/:id' : 'detail'
				},
				
				onRouterChanged : function( event, params ){
					ok( true );
				},
				index : function(){
					ok( true );
					r1.navigate( 'detail/1' );
				},
				
				detail : function( id ) {
					equal( id, '1' );
					r1.navigate( '', { trigger : false } );
					start();
				}
			} );
			
			//等同于 new routerClass()
			r1 = routerClass.create();
			
			//等同于router.start()
			r1.start();
			

		});		
		
		asyncTest('addRules', 2, function() {
			var routerClass,
				r1;
			
			routerClass = router.define( {
				rules : {
					'' : 'index'
				},
				
				index : function(){
					ok( true );
					r1.addRules( {
						'detail/:id' : 'detail'
					} );
					r1.navigate( 'detail/1' );
				},
				
				detail : function( id ) {
					equal( id, '1' );
					r1.navigate( '', { trigger : false } );
					start();
				}
			} );
			
			//等同于 new routerClass()
			r1 = routerClass.create();
			
			//等同于router.start()
			r1.start();
			

		});
		
		
	}
);