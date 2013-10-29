(function($){
var tpl_app = require( 'page/detail/tpl/detail.tpl' );
Chassis.SubView.detail_content = Chassis.SubView.extend({

      el: '#detail_page_content'
	
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
        

	}
	
	


});

})(Zepto);
