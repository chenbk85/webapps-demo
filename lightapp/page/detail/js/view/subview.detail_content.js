(function($){
var tpl_app = baidu.template( $( '#tpl-detail' ).html() );
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
		
		me.$el.html( tpl_app({}) );
        me.hideLoading();
    }
	
	, onBeforePageIn : function(){
		this.$el.show();
        

	}
	
	


});

})(Zepto);
