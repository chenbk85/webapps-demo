(function($){

Chassis.PageView.cover = Chassis.PageView.extend({

    el: '#cover_page'

    ,init: function(options){
        var me = this,opt;
        
		
		
        opt = $.extend({}, options);

        me.setup('cover_content',opt);

		me.renderAsyncSubView();
    },
    
    onBeforePageIn : function(){
        
    }

});

})(Zepto);
