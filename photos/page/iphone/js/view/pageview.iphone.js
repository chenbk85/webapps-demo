(function($){

Chassis.PageView.iphone = Chassis.PageView.extend({

    el: '#iphone_page'

    ,init: function(options){
        var me = this,opt;
        
        opt = $.extend({}, options);

        me.setup('iphone_content',opt);

		me.renderAsyncSubView();
    },
    
    onBeforePageIn : function(){
        
    }

});

})(Zepto);
