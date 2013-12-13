// ==========================================
// Copyright 2013 Baidu, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define( 
	[
		'base/index',
		'mixin/index',
		'event/index',
		'router/hash'
	],
	
	function( base, mixin, event, hash ){
		var noop = function(){},
			router = noop;
		
		router._instance = {};
		/**
		 * 可以通过ID获取到对应的实例
		 *
		 */
		router.get = function( id ) {
			return this._instance[ id ];
		};
		
		router._set = function( routers ) {
			var me = this;
			
			!base.isArray( routers ) &&
				( routers = [ routers ] );
			
			base.each( routers, function( item, key ) {
				me._instance[ item.id ] = item;
			} );
			
			return me;
		};
		
		/**
		 * router.define( {
		 *     rules : {},
		 *     type  : 'hash',
		 *     onRouterChanged : function(){}
		 * } )
		 *
		 */
		router.define = function( attributes ) {
			var init = function( opts ) {
					var me = this;
					
					me.id = me.id || base.uniqueId( 'r' );
					router._set( me );
					
					//global
					/*router.start    = me.start;
					router.stop     = me.stop;
					router.navigate = me.navigate;
					router.addRules = me.addRules;
					*/
					
					me._rules = [];
					me.options = opts || {};
					!(
						( me.type === 'pushState' ) &&
							history.pushState &&
								mixin( me, pushState )
					) &&  
						mixin( me, hash );
					
					me.stop();
					
					me.addRules( me.rules );

					me.on( 'routerChange', me.onRouterChanged, me );
					
					me.init();
					
					return me;
			};
			
			
			mixin( init.prototype, router.prototype, attributes );
			
			mixin( init, {
				create : function( opts ) {
					return new this( opts );
				},
				
				set : function( attributes ){
					mixin( init.prototype, attributes );
					return init;
				}
			} );
			
			
			
			return init;
		};
		
		event.mixto( router.prototype )
			 .mixin( {
			
				id : '',
				
				type : 'hash',
				
				init : noop,
				
				/**
				 * instance.start()
				 *
				 */
				start : function() {
					var me = this;
					me._startListening();
					return me;
				},
				
				/**
				 * instance.stop()
				 *
				 */
				stop : function() {
					var me = this;
					me._rules = [];
					me._stopListening();
					return me;
				},
				
				/**
				 * instance.navigate( fragments, options )
				 *
				 */
				navigate : function( fragments, options ) {
					var me = this;

					me._rules || ( me._rules = [] );
					
					me._setFragments( fragments );
					
					( ( options || {} )[ 'trigger' ] !== false ) &&
						base.each( me._rules, function( item ) {
							item.route.test( fragments ) &&
							item.callback( fragments );
						} );
					
					return me;
				},
				
				/**
				 * instance.addRules( { 're' : callback } )
				 *
				 */
				addRules : function( rules ) {
					var me = this;
					base.each( rules, function( callback, route ) {
						var routeRe = me._toRegExp( route );
						
						callback = me._getHandler( callback );
						
						me._rules.unshift( {
							route    : routeRe,
							callback : function( fragments ) {
								var val = routeRe.exec( fragments ).slice( 1 );
								callback.apply( me, val );
							}
						} );
						
					} );
				
				},
				
				_getHandler : function( action ) {
					var me = this;
			
					return function() {
						
						var fn = me[ action ];

						if ( base.isFunction( fn ) &&
								fn.apply( this, arguments ) === false ) {
							return;
						}
						
						me._prevAction = me._curAction || '';
						me._curAction = action;
					
						me.trigger( 'routerChange', {
							from : me._prevAction,
							to   : me._curAction,
							params : [].slice.call( arguments )
						} );

					};
				
				},
				
				_loadUrl : function( fragments ) {
					var me = this;
					me._rules || ( me._rules = [] );
					base.each( me._rules, function( item ){
						item.route.test( fragments ) &&
						item.callback( fragments );
					} );
					return me;
				},
				
				_toRegExp : function( route ) {
					var optionalParam = /\((.*?)\)/g,
					namedParam    = /(\(\?)?:\w+/g,
					splatParam    = /\*\w+/g,
					escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;
					
					route = route.replace( escapeRegExp, '\\$&' )
							.replace( optionalParam, '(?:$1)?' )
							.replace( namedParam, function( match, optional ) {
								return optional ? match : '([^\/]+)';
							} )
							.replace( splatParam, '(.*?)' );
					return new RegExp( '^' + route + '$' );
				},
				
				onRouterChanged : noop

			} );
		
		return router;
} );