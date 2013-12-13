(function($){

Chassis.PageView.app = Chassis.PageView.extend({

    el: '#app_page'

    ,init: function(options){
        var me = this,opt;
        
        opt = $.extend({}, options);
        
        me.prepend('detail_header',opt);
        me.setup('app_content',opt);

		me.renderAsyncSubView();
    },
    
    onBeforePageIn : function(){
        
    }

});

})(Zepto);
