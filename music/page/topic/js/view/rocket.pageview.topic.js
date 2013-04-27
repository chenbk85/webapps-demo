
(function($) {

rocket.pageview.topic = rocket.pageview.extend({
    el: "#topic_page"

    ,init: function(options){
        var me = this;
        
        me.setup(new rocket.subview.topic_header(options, me));

        me.setup(new rocket.subview.topic_content(options, me));
        
        me.setup(new rocket.subview.shortcut({}, me));
    }
    ,registerEvents : function(){
        var me = this, ec = me.ec;
        ec.on("pagebeforechange", me.onpagebeforechange, me);
    }
    
    ,onpagebeforechange : function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;
        
        if(to == me.ec){
            new rocket.subview.toolbar({
                  title  : "专题",
                  action : 'topic'
            }, me);
        }    
        
    }
});

})(Zepto);


