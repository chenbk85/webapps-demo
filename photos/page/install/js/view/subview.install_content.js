(function($){
var tpl_app = require( 'page/install/tpl/install.tpl' );
Chassis.SubView.install_content = Chassis.SubView.extend({

      el: '#install_page_content'
	
	, events : {
		
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
        
		Chassis.history.navigate( '',{trigger:false} );

	}
	
	


});

})(Zepto);
