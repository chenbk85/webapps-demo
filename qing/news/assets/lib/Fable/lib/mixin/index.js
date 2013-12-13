// ==========================================
// Copyright 2013 Baidu, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define( 
	
	[
		'base/index'
	],
	
	
	function( base ) {
		
		var mixin,
			mixto,
			mixinOwner;
			
		
		
		mixin = function( src, dest, overwrite ){
		
			var argc = arguments.length,
				argv = [].slice.call( arguments, 1 );

			if ( !argc ) {
				src = mixin;
			}
			
			if ( !base.isArray( src ) ) {
				src = [ src ];
			}
			
			overwrite = base.isBoolean( argv[ argc - 2 ] ) ? 
							argv.pop() === false ? false : true : 
							true;
			dest = argv;

			base.each( src, function( value, key ) {
				base.each( { 'mixin' : mixinOwner, 'mixto' : mixto }, function( mValue, mKey ) {
					src[ key ][ mKey ] = mValue;
				} );
			} );
			
			base.each( dest, function( dValue, dKey ) {
				base.each( dValue, function( value, key ) {
					base.each( src, function( sValue, sKey ) {
						!(
							!overwrite  &&
							sValue.hasOwnProperty( key )
						) && 
						( 
							//如果某个属性被覆盖了，可以通过_owner获取第一个被覆盖的同名属性
							!src[ sKey ]['hasOwnProperty']( '_owner' ) && 
								( src[ sKey ][ '_owner' ] = {} ),
								
							src[ sKey ]['hasOwnProperty']( key ) &&
								!src[ sKey ][ '_owner' ]['hasOwnProperty']( key ) &&
									( src[ sKey ][ '_owner' ][ key ] = src[ sKey ][ key ] ),
									
							src[ sKey ][ key ] = value
							
						)
						
					} );
				} );
			} );
			
			return src.length > 1 ? 
				src : src[ 0 ];
		};
		
		mixto = function() {
			var argv = [].slice.call( arguments, 0 ),
				last = [ argv.pop() ] ;
			
			base.isBoolean( last[ 0 ] ) ?
						last.unshift( this ) :
						last.push( this );
			
			
			argv = argv.concat( last );
			
			return mixin.apply( this, argv );
		};
		
		mixinOwner = function() {
			var argv = [].slice.call( arguments, 0 );
			argv.unshift( this );
			return mixin.apply( this, argv );
		};
		
		return mixin;

} );