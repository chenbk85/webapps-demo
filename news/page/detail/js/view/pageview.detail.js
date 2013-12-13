(function($){

Chassis.PageView.detail = Chassis.PageView.extend({

    el: '#detail_page'

    ,init: function(options){
        var me = this,opt;
        
        opt = $.extend({}, options);
        
        
        me.append('detail_header',opt);
		me.append('detail_ad',opt);
        me.append('detail_content',opt);

		me.renderAsyncSubView();

    },
    
    onBeforePageIn : function(){
        
    }

});

})(Zepto);
