// ==========================================
// Copyright 2013 Baidu, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define( 
	
	[
		'mixin/index'
	],
	
	function(){
	
		var mixin = require( 'mixin/index' );
		
		module('Iron.Module.mixin');
		
		asyncTest('mixin test json', 2, function() {
			var a = {a:1,b:2};
			var b = {c:3,d:4};
		
			mixin( a, b );
		
			a.mixin( {e:5} );
			a.mixto( b );
			
			equal( a.c, b.c );
			equal( b.a, a.a );
			start();

		});
		
		asyncTest('mixin test function', 1, function() {
			var a = {a:1,b:2};
			var b = function(){};
		
			mixin( b.prototype, a );
		
			equal( (new b)[ 'a' ], 1);
			start();

		});
		
		asyncTest('overwrite attribute or method', 2, function() {
			var a = {
					say : function(){
						ok( true );
					}
				},
				
				b = {
					say : function(){
						this._owner.say();
						ok( true );
					}
				};
				
			mixin( a, b );
			
			a.say();
			
			start();

		});
	}
);