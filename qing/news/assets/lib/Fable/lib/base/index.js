// ==========================================
// Copyright 2013 Baidu, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define( 
	[
		'underscore/underscore'
	],
	
	function(){
		var _ = require( 'underscore/underscore' ),
			base = {
				$          : $,
				isBoolean  : _.isBoolean,
				isArray    : _.isArray,
				isObject   : _.isObject,
				isFunction : _.isFunction,
				isNumber   : _.isNumber,
				isString   : _.isString,
				inArray : function( a, b ){
					return _.indexOf( a, b ) >= 0;
				},
				indexOf    : _.indexOf,
				indexBy    : _.indexBy,
				
				//modify from jQuery
				each       : function( obj, callback ) {
					var name,
						i = 0,
						length = obj ? obj.length : 0,
						isObj = !base.isArray( obj );
						
					
					if ( isObj ) {
						for ( name in obj ) {
							if ( callback.call( obj[ name ], obj[ name ], name ) === false ) {
								break;
							}
						}
					} else {
						for ( ; i < length;i++ ) {
							if ( callback.call( obj[ i ], obj[ i ], i ) === false ) {
								break;
							}
						}
					}

					return obj;
				},
				uniqueId   : _.uniqueId,
				clone      : _.clone
			};
		return base;

} );