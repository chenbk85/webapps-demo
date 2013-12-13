// ==========================================
// Copyright 2013 Baidu, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define( 
	
	[
		'base/index'
	],
	
	function(){
	
		var base = require( 'base/index' );
		
		module('Iron.Module.base');
		
		asyncTest('isBoolean', 5, function() {
			
			var a = true,
				b = false,
				c = null,
				d = function(){},
				e = Boolean(1);
				
			equal( base.isBoolean( a ), true );
			equal( base.isBoolean( b ), true );
			equal( base.isBoolean( c ), false );
			equal( base.isBoolean( d ), false );
			equal( base.isBoolean( e ), true );
			start();

		});
		
		asyncTest('isArray', 7, function() {
			
			var a = [],
				b = [1,2],
				c = Array(0),
				d = Object,
				e = 1,
				f = '',
				g = {a:1,length:1};
				
			equal( base.isArray( a ), true );
			equal( base.isArray( b ), true );
			equal( base.isArray( c ), true );
			equal( base.isArray( d ), false );
			equal( base.isArray( e ), false );
			equal( base.isArray( f ), false );
			equal( base.isArray( g ), false );
			start();

		});
		
		asyncTest('isObject', 7, function() {
			
			var a = [],
				b = [1,2],
				c = Array(0),
				d = Object,
				e = 1,
				f = '',
				g = {a:1};
				
			equal( base.isObject( a ), true );
			equal( base.isObject( b ), true );
			equal( base.isObject( c ), true );
			equal( base.isObject( d ), true );
			equal( base.isObject( e ), false );
			equal( base.isObject( f ), false );
			equal( base.isObject( g ), true );
			
			start();

		});
		
		asyncTest('isFunction', 8, function() {
			
			var a = [],
				b = [1,2],
				c = Array(0),
				d = Object,
				e = 1,
				f = '',
				g = {a:1},
				h = function(){};
				
			equal( base.isFunction( a ), false );
			equal( base.isFunction( b ), false );
			equal( base.isFunction( c ), false );
			equal( base.isFunction( d ), true );
			equal( base.isFunction( e ), false );
			equal( base.isFunction( f ), false );
			equal( base.isFunction( g ), false );
			equal( base.isFunction( h ), true );
			
			start();

		});
		
		asyncTest('isNumber', 8, function() {
			
			var a = [],
				b = [1,2],
				c = Array(0),
				d = Object,
				e = 1,
				f = '',
				g = {a:1},
				h = function(){};
				
			equal( base.isNumber( a ), false );
			equal( base.isNumber( b ), false );
			equal( base.isNumber( c ), false );
			equal( base.isNumber( d ), false );
			equal( base.isNumber( e ), true );
			equal( base.isNumber( f ), false );
			equal( base.isNumber( g ), false );
			equal( base.isNumber( h ), false );
			
			start();

		});
		
		asyncTest('isNumber', 8, function() {
			
			var a = [],
				b = [1,2],
				c = Array(0),
				d = Object,
				e = 1,
				f = '',
				g = {a:1},
				h = function(){};
				
			equal( base.isString( a ), false );
			equal( base.isString( b ), false );
			equal( base.isString( c ), false );
			equal( base.isString( d ), false );
			equal( base.isString( e ), false );
			equal( base.isString( f ), true );
			equal( base.isString( g ), false );
			equal( base.isString( h ), false );
			
			start();

		});
		asyncTest('inArray', 2, function() {
			
			var arr = [ 1,2,4,5,7,9 ];
			
			equal( base.inArray(arr, 1), true );
			equal( base.inArray(arr, 3), false );
			
			start();

		});
		
		asyncTest('indexOf', 2, function() {
			
			var arr = [ 1,2,4,5,7,9 ];
			
			equal( base.indexOf(arr, 1), 0 );
			equal( base.indexOf(arr, 3), -1 );
			
			start();

		});
		
		asyncTest('indexBy', 1, function() {
			
			var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 30}, {name: 'curly', age: 60}];
			var b;
			b = base.indexBy( stooges, 'age' );
			
			equal( b[ '40' ][ 'name' ], 'moe' )
			
			start();

		});
		
		asyncTest('each', 5, function() {
			
			var a = [1,2,3],
				b = {a:1,b:2};
			
			base.each( a, function( item, index ){
				ok( true ); //3
			} );
			
			base.each( b, function( item, key ){
				ok( true ); //2
			} );
			
			start();

		});
		
		asyncTest('uniqueId', 2, function() {
			
			var a = base.uniqueId( 'x' ),
				b = base.uniqueId( 'x' );
			
			notEqual( a , b );
			equal( a.substr(0,1), 'x' )
			start();

		});
		
		asyncTest('clone', 3, function() {
			
			var a = {a:1,b:2,c:3},
				b = base.clone( a ),
				c = a;
			
			notEqual( a, b );
			equal( a, c );
			equal( b[ 'a' ], 1 );
			start();

		});
	}
);