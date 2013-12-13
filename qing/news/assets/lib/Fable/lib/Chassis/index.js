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
		'fxview/index',
		'view/index',
		'router/index'
	],
	
	
	function( base, mixin, event, fxview, view, router ) {
		var Chassis = {},
			instance = {};
		
		Chassis.View  = view;
		Chassis.Event = event;
		Chassis.Base  = base;
		Chassis.Mixin = mixin;
		Chassis.Page  = {};
		
		Chassis.Router = router.define( {
			
			onRouterChanged : function( event, params ) {
				var me = this,
					setting,
					fx;
				
				
				base.each( [ params.from, params.to ], function( item, key ) {
					item &&
						!instance[ item ] &&
							( instance[ item ] = 
								new ( me.getPageClass( item ) )( params.params ) );
				} );
	
				setting = {
					from : instance[ params.from ],
					to   : instance[ params.to ],
					dir  : base.indexOf( me.pageOrder, params.to ) > 
							base.indexOf( me.pageOrder, params.from ) ? 1:0,
					end  : function() {
						
						setting.from && setting.from.trigger( 'afterViewOut', params );
						setting.to   && setting.to.trigger( 'afterViewIn', params );
						
						//恢复位置
						//setting.to && window.scroll(0, setting.to._position);
					}
				
				};
				
				setting.from && setting.from.trigger( 'beforeViewOut', params );
				setting.to   && setting.to.trigger( 'beforeViewIn', params );
				
				fx = me.pageTransition[ params.from + '-' + params.to ] || 
							me.pageTransition[ params.to + '-' + params.from ];
				
				
				// 记忆位置
				//获取from/to的位置并记录下来，假设位置分别为a,b
				//setting.from && (setting.from._position = a);

				
				// 做动画
				fxview.animation( fx || 'simple', setting );
			}
		
		} );

		return Chassis;
} );