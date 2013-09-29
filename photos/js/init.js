var _TRANSITION_   = require( 'js/pageview._TRANSITION_.js' ),
	chassis_config = require( 'js/chassis.config.js' ),
	app_data       = require( 'js/app.data.js' );



window.app = window.app || {};



(function($) {

	$.extend(app, {
	
		router : Chassis.Router.extend( {{setting.router}} ),
		
		init: function() {
			// 设置全局载入条和局部载入条
			
			var hash;
			
			var height = screen.height; //568-480=88
			
			app.isIphone5 = height > 480;
			
			
			if (window.navigator.userAgent.indexOf('iPhone') != -1) {
				if (window.navigator.standalone == true) {
					// Initialize your app
					hash = 'cover';
				}else{
					// Display a message asking to add the app to the Home Screen
					hash = 'cover'; //install
				}
			}else{
				hash = 'iphone';
			}
			
			location.hash = hash;
			
			
			
			Chassis.View.Loading.setup('#wrapper .global-loading','#wrapper .page-loading');
			new app.router();
			Chassis.history.start();
			

			

			function scroll( e ) {

				$(document.body).height(600);


				setTimeout(function(){
					window.scrollTo(0, 0);
					$.later(function(){
						
						$(document.body).height( app.isIphone5 > 480 ?  523 : 435 );
						
					});
					app.isLoaded = true;
				}, 1000); 

			}

			$(function(e){
				scroll();
			});
			
			
		}

	});

})(Zepto);


