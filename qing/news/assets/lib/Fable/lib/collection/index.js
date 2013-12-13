// ==========================================
// Copyright 2013 Baidu, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define( 
	[
		'base/index',
		'mixin/index',
		'event/index'
	],
	
	function( base, mixin, event ) {
		var noop = function(){},
			collection = noop;
		
		collection._instance = {};
		/**
		 * 可以通过ID获取到对应的实例
		 *
		 */
		collection.get = function( id ) {
			return this._instance[ id ];
		};
		
		collection._set = function( collections ) {
			var me = this;
			
			!base.isArray( collections ) &&
				( collections = [ collections ] );
			
			base.each( collections, function( item, key ) {
				me._instance[ item.id ] = item;
			} );
			
			return me;
		};
		
		/**
		 * collection.define( {
		 *
		 * } )
		 *
		 */
		collection.define = function( attributes ) {
			var init = function( items ) {
				this._child = [];
				this.id = this.id || base.uniqueId( 'c' );
				items && this.add( items, { silent : true } );
			};
			
			
			mixin( init.prototype, collection.prototype, attributes );
			
			mixin( init, {
				create : function( opts ) {
					return new this( opts );
				}
			} );
			
			
			
			return init;
		};
		
		event.mixto( collection.prototype )
			 .mixin( {

				length : 0,
				
				add : function( items, opts ) {
					var me = this;
					!this._child &&
						( this._child = [] );
						
					if ( !base.isArray( items ) ) {
						items = [ items ];
					}
					
					base.each( items, function( item ) {
						item._parent = me;
					} );
					
					!opts &&
						( opts = {} );
					
					[].splice.apply(
						this._child,
						[ 
							base.isNumber( opts.at ) ? 
								opts.at : this._child.length, 
							0 
						].concat( items )
					
					);
					
					
					this.length = this._child.length;
					
					!opts.silent &&
						this.trigger( 'add', items );
						
					return this;
				},
				
				append : function( items, opts ){
					!opts &&
						( opts = {} );
					
					opts.at = this._child.length;
					
					return this.add( items, opts );
					
				},
				
				prepend : function( items, opts ) {
					!opts &&
						( opts = {} );
					
					opts.at = 0;
					
					return this.add( items, opts );
				},
				
				addTo : function( targetCollection ) {
					return targetCollection.add( this );
				},
				
				remove : function( items, opts ) {
					var me = this,
						rval = [];
					!opts &&
						( opts = {} );
					
					base.each( items, function( rv ) {
						var index = base.indexOf( me._child, rv );
						
						( index >= 0 ) &&
							rval.push( rv ) && 
							me._child.splice( index, 1 );
							
					} );
					
					me.index = me._child.length;
					
					!opts.silent &&
						me.trigger( 'remove', rval );
				},
				
				// getById/getByIndex
				get : function( key ) {
					var me = this,
						ret;
					
					!me._child &&
						( me._child = [] );
					
					if( base.isNumber( key ) ) {
						return me._child[ key ];
					}
					
					if( base.isString( key ) ) {
						base.each( me._child, function( v, k ) {
							if( v.id === key ) {
								ret = v;
							}
							return false;
						});
						
						return ret;
					}
				},
				
				pluck : function( attrs ) {
					var me = this,
						ret = [];
					
					!me._child &&
						( me._child = [] );
						
					base.isString( attrs ) &&
						base.each( me._child, function( v ) {
							ret.push( v[ attrs ] );
						} );
					base.isArray( attrs ) && 
						base.each( me._child, function( v ) {
							var _add = {};
							
							base.each( attrs, function( va ) {
								_add[ va ] = v[ va ];
							} );
							
							ret.push( _add );
						} );
					return ret;
				},
				
				clear : function( opts ) {
					
					!opts &&
						( opts = {} );
						
					this._child = [];
					
					this.length = 0;
					
					!opts.silent &&
						this.trigger( 'clear' );
					
					return this;
				},
				
				each : function( fn ) {
					!this._child &&
						( this._child = [] );
					return base.each.apply( null, [ this._child, fn ] );
				},
				
				sortBy : function( key, opts ) {
					var me = this,
						newAttribute;
					!opts &&
						( opts = {} );
						
					!me._child &&
						( me._child = [] );
						
					newAttribute = base.indexBy( me._child, key );
					
					me.clear( { cilent: true } );
					base.each(newAttribute, function( item, key ) {
						me._child.push( item );
					} );
					
					!opts.silent &&
						me.trigger( 'sort' );
				}
			} );
			
		/*
		 * 对collection的事件传递交给第三方自己做
		 *
		 *
		 */
		
		return collection;
} );