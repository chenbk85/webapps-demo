(function($){
var tpl_app = require( 'page/index/tpl/index.tpl' );
Chassis.SubView.index_content = Chassis.SubView.extend({

      el: '#index_page_content'
	
	, events : {
		
	}

    ,init: function(options){
        var me = this;

        me.showLoading();
        me.render();

    }

    

    ,render: function(sections){
        var me = this;
		
		me.$el.append( tpl_app.template({}) );
        me.hideLoading();
    }
	
	, onBeforePageIn : function(){
		this.$el.show();
        

	}
	
	


});

})(Zepto);
