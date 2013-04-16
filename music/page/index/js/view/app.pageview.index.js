
(function($) {

app.pageview.index = app.pageview.extend({
      el: "#index_page"

    , init: function(options){
        var me = this;
        
        me.MAX_SUBPAGES = 6;

        me.setup(new app.subview.index_scroll(options, me));
        me.setup(new app.subview.index_nav(options, me));
        me.setup(new app.subview.index_cover(options, me));
        me.setup(new app.subview.index_category(options, me));
        me.setup(new app.subview.index_singerhot(options, me));
        me.setup(new app.subview.index_musichot(options, me));
        
        
        
    }
    
    , registerEvents : function(){
        var me = this, ec = me.ec;
        ec.on("pagebeforechange", me.onpagebeforechange, me);
    }
    
    , onpagebeforechange : function(params){
        var 
              me = this
            , from = params.from
            , to = params.to
            , param = params.params
            ;
        
        if(to == me.ec){
            new app.subview.toolbar({title:"百度音乐",action:'index'},me);
            
            $('#footer-index').show();
            $('#footer').hide();
            me.refreshScrollerHeight();
        }else{
            $('#footer-index').hide();
            $('#footer').show();
        }
        
    }
    
    , refreshHeight: function(){
        var me = this;
        window.scrollTo(0, 0);
        app.refreshScroll();
    }
    
});

})(Zepto);


