

window.app = window.app || {};

app.router = Chassis.Router.extend( app.router );

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


