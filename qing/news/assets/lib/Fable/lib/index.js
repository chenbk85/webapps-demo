// ==========================================
// Copyright 2013 Baidu, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define( 
	
	[
		'Chassis/index'
	],
	
	
	function( Chassis ) {
		
		Chassis.Page.index = Chassis.View.define( {
			
			el : '#index_page',
			
			init : function(){
				
			},
			
			onBeforeViewIn : function(){
				console.log( 'index before in' );
			},
			
			onBeforeViewOut : function(){
				console.log( 'index before out' );
				$('#absolute').hide();
			},
			
			onAfterViewIn : function(){
				App.trigger('indexViewIn');
			},
			
			onAfterViewOut : function(){
				App.trigger('indexViewOut');
				
			}
			
		} );
		
		Chassis.Page.detail = Chassis.View.define( {
		
			el : '#detail_page',
			
			init : function(){
				console.log( 'detail init' );
			},
			
			onBeforeViewIn : function(){
				console.log( 'detail before in' );
			},
			
			onBeforeViewOut : function(){
				console.log( 'detail before out' );
			},
			
			onAfterViewIn : function(){
				console.log( 'detail after in' );
			},
			
			onAfterViewOut : function(){
				App.trigger('detailViewOut');
			}
		} );
		
		Chassis.Page.app_info = Chassis.View.define( {
		
			el : '#appinfo_page'
		} );
		
		Chassis.Page.app_setting = Chassis.View.define( {
		
			el : '#appsetting_page'
		} );
		
		Chassis.Page.history = Chassis.View.define( {
		
			el : '#history_page'
		} );
		
		
		Chassis.router = Chassis.Router.set( {
			
			rules : {
				''       : 'index',
				'detail' : 'detail',
				'app_info'  : 'app_info',
				'app_setting' : 'app_setting',
				'history':'history'
			},
			
			defaultPageTransition : 'slider',
			enablePositionRestore : true,
			pageTransition : {
				'index-detail' : 'slider'
			},
			pageOrder : [
				'index',
				'detail',
				'app_info',
				'app_setting',
				'history'
				
			],
			getPageClass : function( action ) {
				return Chassis.Page[ action ];
			}
		
		} ).create();
		
		window.location.hash = '';
		
		App.router = {
			init : function(){
				Chassis.router.start();
			}
		};
		
} );