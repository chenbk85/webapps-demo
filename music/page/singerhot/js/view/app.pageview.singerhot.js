/**
 * 首页View类
 */
(function($) {

app.pageview.singerhot = app.pageview.extend({
    el: "#singerhot_page"

    ,init: function(options){
        var me = this;

        // 创建header子视图
        me.setup(new app.subview.singerhot_header(options, me));

        // 创建content子视图
        me.setup(new app.subview.singerhot_content(options, me));
        
        me.setup(new app.subview.shortcut({}, me));
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
            new app.subview.toolbar({title:"热门歌手",action:'singerhot'},me);
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


