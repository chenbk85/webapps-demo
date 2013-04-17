/**
 * 首页View类
 */
(function($) {

app.pageview.song = app.pageview.extend({
      el: "#song_page"

    , init: function(options){
        var me = this;

        me.setup(new app.subview.song_content(options, me));
        
        me.setup(new app.subview.shortcut({}, me));
    }
    
    ,registerEvents : function(){
        var me = this, ec = me.ec;
        ec.on("pagebeforechange", me.onpagebeforechange, me);
    }
    
    ,onpagebeforechange : function(params){
        var 
              me = this
            , from = params.from
            , to = params.to
            , param = params.params
            ;
        
        if(to == me.ec){
            new app.subview.toolbar({
                  title  : "播放歌曲"
            }, me);
        }    
        
    }
});

})(Zepto);


