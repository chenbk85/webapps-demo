/**
 * 首页View类
 */
(function($) {

app.pageview.singer = app.pageview.extend({
    el: "#singer_page"

    ,init: function(options){
        var me = this;

        me.setup(new app.subview.singer_header(options, me));

        me.setup(new app.subview.singer_content(options, me));
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
            new app.subview.toolbar({title:"歌手",action:'singer'},me);
            me.refreshScrollerHeight();
        }
        
    }
    
    ,refreshHeight: function(){
        var me = this;
        window.scrollTo(0, 0);
        app.refreshScroll();
    }

});

})(Zepto);


