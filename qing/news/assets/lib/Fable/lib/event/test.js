// ==========================================
// Copyright 2013 Baidu, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define( 
	
	[
		'event/index'
	],
	
	function(){
	
		var event = require( 'event/index' );
		
		module('Iron.Module.event');
		
		asyncTest('on and trigger', 5, function() {
			var blog = { };
			
			event.mixto( blog );
			
			blog.on( 'event', function( event, params ) {
				
				ok( true );
				
				equal( event.type, 'event' );
				equal( event.target, blog );
				equal( params.m, 1 );
				equal( params.n, 2 );
				
			}, this );
			
			blog.trigger( 'event',{m:1,n:2} );
			
			start();

		});
		
		asyncTest('off', 2, function() {
			var blog = { counter : 0 };
			
			event.mixto( blog );
			
			blog.on( 'event', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.trigger( 'event',{m:1,n:2} );
			blog.trigger( 'event',{m:1,n:2} );
			equal( blog.counter, 2 );
			
			blog.off( 'event' );
			blog.trigger( 'event',{m:1,n:2} );
			equal( blog.counter, 2 );
			
			start();

		});
		
		asyncTest('once', 1, function() {
			var blog = {counter : 0};
			
			event.mixto( blog );
			
			blog.once( 'event', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.trigger( 'event',{m:1,n:2} );
			blog.trigger( 'event',{m:2,n:3} );
			equal( blog.counter, 1 );
			
			start();

		});
		
		asyncTest('namespace on and trigger', 2, function() {
			var blog = {counter : 0};
			
			event.mixto( blog );
			
			blog.on( 'event', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.on( 'event.namespace1', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.on( 'event2.namespace1', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.on( 'event:namespace2', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.on( 'event3', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.trigger( 'event' );
			equal( blog.counter, 3);
			
			blog.trigger( '.namespace1' );
			equal( blog.counter, 5);

			start();

		});	
		
		asyncTest('namespace off [:namespace]', 2, function() {
			var blog = {counter : 0};
			
			event.mixto( blog );
			
			blog.on( 'event', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.on( 'event.namespace1', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.on( 'event2.namespace1', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.on( 'event:namespace2', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.on( 'event3', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.trigger( 'event' );
			equal( blog.counter, 3);
			
			blog.off( ':namespace1' );
			blog.trigger( 'event' );
			
			equal( blog.counter, 5);
			

			start();

		});		
		
		asyncTest('namespace off [name:namespace]', 4, function() {
			var blog = {counter : 0};
			
			event.mixto( blog );
			
			blog.on( 'event', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.on( 'event.namespace1', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.on( 'event2.namespace1', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.on( 'event:namespace2', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.on( 'event3', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.trigger( 'event' );
			equal( blog.counter, 3);
			
			blog.off( 'event:namespace1' );
			blog.trigger( 'event2' );
			equal( blog.counter, 4);
			
			blog.off( 'event:namespace2' );
			blog.trigger( 'event' );
			equal( blog.counter, 5);
			
			blog.off();
			blog.trigger( 'event' );
			equal( blog.counter, 5);
			
			start();

		});
		asyncTest('event all', 1, function() {
			var blog = {counter : 0};
			
			event.mixto( blog );
			
			blog.on( 'event', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.on( 'all', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.trigger( 'event' );
			
			equal( blog.counter, 2 );
			
			start();
		
		});
		
		asyncTest('event all.before', 1, function() {
			var blog = {counter : 0};
			
			event.mixto( blog );
			
			blog.on( 'event', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.on( 'all', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.on( 'all.before', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.trigger( 'event,all.before' );
			
			equal( blog.counter, 3 );
			
			start();
		
		});
		
		asyncTest('trigger anything', 1, function() {
			var blog = {counter : 0};
			
			event.mixto( blog );
			
			blog.on( 'event', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.on( 'all', function( a, b ){
				blog.counter++;
			}, this );
			
			blog.trigger( 'anything' );
			
			equal( blog.counter, 1 );
			
			start();
		
		});
		
		asyncTest('return false', 2, function() {
			var blog = {counter : 0},
				tag  = true;
			
			event.mixto( blog );
			
			blog.on( 'event', function( a, b ){
				blog.counter++;
				return tag;
			}, this );
			
			blog.on( 'event', function( a, b ){
				blog.counter += 2;
			}, this );
			
			blog.trigger( 'event' );
			equal( blog.counter, 3 );
			
			tag = false;
			blog.trigger( 'event' );
			equal( blog.counter, 4 );
			
			start();
		
		});
		
		
	}
);