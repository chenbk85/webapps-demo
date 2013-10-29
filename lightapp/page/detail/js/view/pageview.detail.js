(function($){
var tpl_app = baidu.template( $( '#tpl-detail' ).html() );

Chassis.PageView.detail = Chassis.PageView.extend({

    el: '#detail_page'

    ,init: function(options){
        var me = this;
		
		me.$el.find('#detail_page_content').html( tpl_app({}) );
        me.hideLoading();
    },
    
    onBeforePageIn : function(){
        this.$el.show();
    }

});

})(Zepto);
