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
		'collection/index'
	],
	
	function( base, mixin, event, collection ){
		var noop = function(){},
			view = noop,
			getStampString = function( stamp, params ) {
				var _stampString = '';
				stamp &&
					base.isString( stamp ) &&
						(
							_stampString = stamp,
							base.each( params, function( value, key ){
								var re = new RegExp( ":" + key, 'g');
								_stampString = _stampString.replace( re, value );
							} )
						);
				return _stampString;
			};
		
		view._instance = {};
		/**
		 * 可以通过ID获取到对应的实例
		 *
		 */
		view.get = function( id ) {
			return base.isObject( id ) ? id: this._instance[ id ];
		};
		
		view._set = function( views ) {
			var me = this;
			
			!base.isArray( views ) &&
				( views = [ views ] );
			
			base.each( views, function( item, key ) {
				me._instance[ item.id ] = item;
			} );
			
			view.trigger( '_create:plugin', views );
			
			return me;
		};
		
		view._remove = function( item ) {
			var me = this;
			base.isString( item ) &&
				( item = view.get( item ) );
			
			base.each( me._instance, function( instance, key ) {
				if( item.id === instance.id ) {
					me._instance.splice( key, 1 ); //不应该删除，应该保留其class?
					return false;
				}
				
			} );
			view.trigger( '_destroy:plugin' );
		};
		
		view.define = function( attributes ) {
			var init = function( params ) {
					var me = this;
					me.id = me.id || base.uniqueId( 'v' );
					view._set( me );
					
					me.$el = base.$( me.el );
					
					base.each( 
						{
							'beforeViewIn'  : me._onBeforeViewIn,
							'beforeViewOut' : me._onBeforeViewOut,
							'afterViewIn'   : me._onAfterViewIn,
							'afterViewOut'  : me._onAfterViewOut
						}, 
						function( callback, event ) {
							me.on( event, callback, me );
						} 
					);
					
					//初始化global插件
					base.each( view._plugin, function( plugin ) {
						new plugin( me );
					} );
					
					//设置标记
					me._stampString = getStampString( me.stamp, params );

					me.init.call( me, params );
			};
			
			mixin( init.prototype, view.prototype, attributes );
			mixin( init, {
				create : function( params ) {
					var me = this,
						stamp = me.prototype.stamp,
					    stampString = getStampString( stamp, params ),
						ret = {},
						instance;

					
					
					//同一个define只会创建唯一的_stampString
					stamp &&
						base.isString( stamp ) &&
							base.each( view._instance, function( viewInstance ) {
								( viewInstance.stamp === stamp ) &&
									( viewInstance._stampString === stampString ) &&
										( viewInstance.constructor.id === me.id ) &&
											( instance = viewInstance );
								if ( instance ) {
									return false;
								}
								
							} );
					
					//同一个define，且未设置stamp，那么只许创建唯一的实例
					( stamp === '' ) &&
						base.each( view._instance, function( viewInstance ) {
							( viewInstance.constructor.id === me.id ) &&
								( instance = viewInstance );
							if ( instance ) {
									return false;
							}
						} );

					ret = instance || new this( params );
					return ret;
				},
				
				id : base.uniqueId( '_v' ),
				
				klass : init
				
			} );
			
			return init;
		};
		
		view._plugin = [];
		
		view.register = function( plugin ) {
			return new plugin( view );
		};
		
		event.mixto( view.prototype )
			 .mixin( {
			
				id : '',
				
				el : '',

				init : noop,
				
				//用于标记同一类型是否需要新增实例，比如stamp:':id/:kid'
				stamp : '',
				
				//如果设置了stamp标记，那么超过这个数字就会开始清理，清理是由插件来完成的
				max : 10,

				register : function( plugin ) {
					return new plugin( this );
				},
				
				destroy : function() {
					//
					view._remove( this );
				}
				
				//使得其具有collection的能力
			}, collection.prototype );
			
		
		base.each( [ 
				'onBeforeViewIn', 
				'onBeforeViewOut', 
				'onAfterViewIn', 
				'onAfterViewOut'
			], function( event ) {
				var _pe = event.substr( 2 );
				_pe = _pe.substring( 0, 1 ).toLowerCase() + _pe.substr( 1 );
				view.prototype[ '_' + event ] = function() {
					var me = this;
					me.trigger( '_' + _pe + ':plugin' );
					view.trigger( '_' + _pe + ':plugin' );
					
					//onBeforeViewIn之前，需要处理公用view的问题
					
					( event === 'onBeforeViewIn' ) &&
						me.each( function( view ) {
							var shadow;
							// view还在别的节点下
							if( view._parent !== me ) {
								
								//移过来替换当前的，同时记得保留一个影子
								shadow = view.$el.clone();
								
								shadow.length &&
									(
										$( shadow ).attr( 'viewid', view.id ), //确保每一个view必须被单一节点包裹
								
										view.$el.after( shadow ),
								
										view.$el.parent().find( '[viewid=' + view.id + ']' ).replaceWith( view.$el )
									
									);
									
								view._parent = me;
							}
							
							
						} );
					
					me[ event ].apply( me, arguments );
					
					//因为它具有collection的能力，所以这4类事件需要派发到其child上
					me.each( function( view ) {
						( view._parent === me ) && //影子节点不需要处理
							view.trigger( _pe );
					} );
					
					
					// isActive
					view.isActive = ( event !== 'onAfterViewOut' );
						
				};
				view.prototype[ event ] = noop;
			} );
		
		
		event.mixto( view );
		
		return view;
} );