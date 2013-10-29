window.app = window.app || {};


(function($) {

	$.extend(app, {
		init: function( router ) {
			
			router = Chassis.Router.extend( router );
			router = new router();
			// 设置全局载入条和局部载入条
			Chassis.View.Loading.setup('#wrapper .global-loading','#wrapper .page-loading');

			
			new Chassis.GlobalView.sidenav({}, router);
			Chassis.history.start();
			
			var height = $(window).height();

			$( '#wrapper' ).height(  height - 55 );
			$( '.pageview' ).height( height - 75 );
			
			
		}

	});
	
	
})(Zepto);


