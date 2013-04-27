
(function($) {

rocket.pageview.artist = rocket.pageview.extend({
    el: "#artist_page"

    ,init: function(options){
        var me = this;

        me.setup(new rocket.subview.artist_header(options, me));

        me.setup(new rocket.subview.artist_content(options, me));
        
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
            new rocket.subview.toolbar({title:"歌手",action:'artist'},me);
        }
        
    }


});

})(Zepto);


