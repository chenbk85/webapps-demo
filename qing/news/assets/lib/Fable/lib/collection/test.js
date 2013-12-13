// ==========================================
// Copyright 2013 Baidu, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define( 
	
	[
		'collection/index'
	],
	
	function(){
	
		var collection = require( 'collection/index' );
		
		module('Iron.Module.collection');
		
		asyncTest('init', 1, function() {
			var cc = collection.define().create();
			
			equal( cc.length, 0 );
			
			start();

		});
		
		asyncTest('add', 3, function() {
			var cc = collection.define().create();
			
			cc.on( 'add', function( event, argv ) {
				ok( true );
			} );
			
			cc.add( [ {'a':1} ], {} );
			
			equal( cc.length, 1 );
			
			cc.add( [ {'b':1} ], { silent : true } );
			
			equal( cc.length, 2 );
			start();

		});
		
		asyncTest('append', 4, function() {
			var cc = collection.define().create();
			
			cc.on( 'add', function( event, argv ) {
				ok( true );
			} );
			
			cc.add( [ {'a':1} ], {} );
			
			equal( cc.length, 1 );
			
			cc.append( [ {'b':1} ], { silent : true } );
			
			equal( cc.length, 2 );
			
			equal( cc.get( 1 )[ 'b' ], 1 );
			
			start();

		});
		
		asyncTest('prepend', 4, function() {
			var cc = collection.define().create();
			
			cc.on( 'add', function( event, argv ) {
				ok( true );
			} );
			
			cc.add( [ {'a':1} ], {} );
			
			equal( cc.length, 1 );
			
			cc.prepend( [ {'b':1} ], { silent : true } );
			
			equal( cc.length, 2 );
			
			equal( cc.get( 0 )[ 'b' ], 1 );
			
			start();

		});
		
		asyncTest('remove', 1, function() {
			var cc;

			cc = collection.define().create( [
				{a:1,id:'a'},
				{a:5,b:2},
				{c:3,a:2}
			] );
			
			cc.on( 'remove', function( event, argv ) {
				ok( true );
			} );
			
			cc.remove( [ {a:1} ] );
			
			start();

		});
		
		asyncTest('get', 1, function() {
			var cc;
			
			cc = collection.define().create( [
				{a:1,id:'a'},
				{b:2},
				{c:3,a:2}
			] );

			equal(cc.get( 'a' )[ 'a' ], 1);

			start();
		});
		
		asyncTest('pluck', 1, function() {
			var cc;

			cc = collection.define().create( [
				{a:1,id:'a'},
				{b:2},
				{c:3,a:2}
			] );

			equal(cc.pluck( 'a' )[0], 1);

			start();

		});
		
		asyncTest('clear', 1, function() {
			var cc;

			cc = collection.define().create( [
				{a:1,id:'a'},
				{b:2},
				{c:3,a:2}
			] );
			
			
			cc.clear();
			
			equal(cc.length, 0);
			
			start();

		});
		
		asyncTest('each', 3, function() {
			var cc;

			cc = collection.define().create( [
				{a:1,id:'a'},
				{a:5,b:2},
				{c:3,a:2}
			] );
			
			
			cc.each( function(item){
				ok( true );
			} );
			
			start();

		});
		
		asyncTest('sortBy', 1, function() {
			var cc;
			
			cc = collection.define().create( [
				{a:1,id:'a'},
				{a:5,b:2},
				{c:3,a:2}
			] );

			cc.sortBy( 'a' );
			equal( cc.get( 2 )[ 'a' ], 5 );
			
			start();

		});
		
		asyncTest('loop', 0, function() {
			var cc1,
				cc2,
				cc3;
			cc1 = collection.define().create();
			cc2 = collection.define().create();
			cc3 = collection.define().create( [
				{a:1,id:'a'},
				{a:5,b:2},
				{c:3,a:2}
			] );
			
			cc3.addTo( cc2 )
			   .addTo( cc1 );
			 
			
			
			
			start();

		});
		
		
	}
);