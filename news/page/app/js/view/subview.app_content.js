(function($){
var tpl_app = require( 'page/app/tpl/app.tpl' );
Chassis.SubView.app_content = Chassis.SubView.extend({

      el: '#app_page_content'
	
	, events : {
		'click .product-view-list-item' : 'gotoApp'
	}

    ,init: function(options){
        var me = this;

        me.showLoading();
        me.render();

    }

    

    ,render: function(sections){
        var me = this;
		
		me.$el.html( tpl_app.template({}) );
        me.hideLoading();
    }
	
	, onBeforePageIn : function(){
		this.$el.show();
        

	}
	
	, gotoApp : function( e ){
		var el = $( e.target ),
			url;
		
		while( !el.hasClass( 'product-view-list-item' ) ){
			el = el.parent();
		}
		url = el.find( '.product-view-list-item-icon' ).attr( 'data-url' );
		
		window.location.href = url;
		return false;
	}


});

})(Zepto);
