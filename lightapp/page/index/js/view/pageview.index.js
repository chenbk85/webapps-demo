(function($){
var tpl_app = baidu.template( $( '#tpl-index' ).html() );
Chassis.PageView.index = Chassis.PageView.extend({

    el: '#index_page'

    ,init: function(options){
        var me = this;

        me.showLoading();
        me.render();
    },
    
	render: function(sections){
        var me = this;
		
		me.$el.find('#index_page_content').append( tpl_app({}) );
        me.hideLoading();
    },
	
    onBeforePageIn : function(){
        this.$el.show();
    }

});

})(Zepto);
