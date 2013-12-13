// ==========================================
// Copyright 2013 Baidu, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
/**
 * mgr插件
 *
 * 插件注册是需要注意是注册到Module/Class/Instance
 * mgr插件是需要注册到Module
 */

define( 
	[
		'base/index',
		'mixin/index',
		'event/index'
	],
	
	function( base, mixin, event ){
		var mgr = function( view ) {
				this.listenTo( view, '_create:plugin', this.recycle );
			},
			
			getRoot = function( view ){
				if ( view._parent ) {
					return getRoot( view._parent );
				}
				
				return view;
			},
			
			recycleBySampleStamp : function( view ) {
				var recycled = false;
				
				recycled = recycleChildBySampleStamp( view );
				
				if ( recycled ) {
					return true;
				}
				
				if ( !view.length ) {
					return false;
				}
				
				view.each( function( item ) {
					var _recycled = recycleChildBySampleStamp( view );
					
					if ( _recycled ) {
						recycled = true;
						return false;
					}
					
				} );
				
				return recycled;
			},
			
			recycleChildBySampleStamp : function( view ) {
				var map      = {},
					maxIndex = 0,
					ret;
				view.each( function( child ) {
					(child.stamp !== '') &&
						(
							!map[ child.stamp ] &&
								( map[ child.stamp ] = { len : 0, point: child } ),
							map[ child.stamp ][ 'len' ]++
						);
				} );
				
				//寻找最大
				base.each( map, function( obj ) {
					( obj.len > maxIndex ) &&
						(
							maxIndex = obj.len,
							ret = obj
						)
				} );
				
				
				ret &&
					(
						ret.destroy(),
						ret = true
					)
				return ret;
				
			};
		
		event.mixto( mgr.prototype )
			 .mixin( {
				recycle : function( views ) {
					var recycled   = false,
						ignoreRoot = [];
					//views及其所有父节点都不回收
					
					if ( this.option.view.length <= this.option.max ) {
						return;
					}
					
					// 回收算法描述：
					// 1. 排除活动中的
					// 2. 回收非顶级view，且设置了stamp的，并且该stamp数量最多
					// 3. 回收顶级view
					// 4. 当上面条件都不满足时，回收活动中的view下非活动的view
					this.option.view.each( function( view ) {
						
						if ( view.isActive ) {
							return;
						}
						
						recycled = recycleBySampleStamp( view )
						
					} );
					
					if ( recycled ) {
						return;
					}
					
					this.option.view.each( function( view ) {
						if ( view.isActive ) {
							return;
						}
						
						view.destroy();
						
						recycled = true;
						
					} );
					
					if ( recycled ) {
						return;
					}
					
					var deepRecycle = function( view ) {
						var _recycled = false;
						if ( view.length ) {
							view.each( function( item ) {
								_recycled = deepRecycle( item );
								
								if ( _recycled ) {
									return false;
								}
							} );
						} else {
							if ( view.isActive ) {
								return false;
							}
							
							view.destroy();
							
							return true;
						}
						
						
						
					};
					
					deepRecycle( this.option.view );
					
					
				},
				
				unRegister : function() {
					this.stopListening();
				}
			} );
		
		return {
			
			registerTo : function( view, opts ) {
				!opts &&
					( opts = {} );
					
				opts = mixin( {
						max : 10,
						view : view
					}, opts );
				
				mgr.option = opts;
				
				return view.register( mgr );
			}
		}
} );