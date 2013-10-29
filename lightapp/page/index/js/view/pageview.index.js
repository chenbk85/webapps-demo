(function($){

Chassis.PageView.index = Chassis.PageView.extend({

    el: '#index_page'

    ,init: function(options){
        var me = this,opt;
        
        opt = $.extend({}, options);

        me.setup('index_content',opt);

		me.renderAsyncSubView();
    },
    
    onBeforePageIn : function(){
        
    }

});

})(Zepto);
