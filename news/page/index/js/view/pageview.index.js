(function($){

Chassis.PageView.index = Chassis.PageView.extend({

      el: '#index_page'

    , init: function(options){
        var me = this, opt;
        
		
        opt = $.extend({}, options);
        
        me.setup('index_header',opt);
        me.setup('index_nav',opt);
		me.setup('index_ad',opt);
		me.setup('index_content',opt);
        

		
		me.renderAsyncSubView();
    }

});

})(Zepto);
