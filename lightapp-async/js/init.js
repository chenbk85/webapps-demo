var _TRANSITION_   = require( 'js/pageview._TRANSITION_.js' );
var chassis_config = require( 'js/chassis.config.js' );
var app_data       = require( 'js/app.data.js' );

window.app = window.app || {};

app.router = Chassis.Router.extend( {{setting.router}} );

(function($) {

	$.extend(app, {
		init: function() {
			
			// 设置全局载入条和局部载入条
			Chassis.View.Loading.setup('#wrapper .global-loading','#wrapper .page-loading');

			new app.router();
			Chassis.history.start();

			function scroll(e){
				$(document.body).height(600);


				setTimeout(function(){
					window.scrollTo(0, 0);
					$.later(function(){
						$(document.body).height($(window).height());
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


