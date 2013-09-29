(function($){

Chassis.PageView.install = Chassis.PageView.extend({

    el: '#install_page'

    ,init: function(options){
        var me = this,opt;
        
        opt = $.extend({}, options);

        me.setup('install_content',opt);

		me.renderAsyncSubView();
    },
    
    onBeforePageIn : function(){
        
    }

});

})(Zepto);
