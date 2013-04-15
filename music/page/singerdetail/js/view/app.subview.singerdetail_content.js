
(function($) {

app.subview.singerdetail_content = app.subview.extend({
    el: "#singerdetail_page_content"

    ,init: function(options){
        var me = this, 
            id = options.id,
            subView;
        
        me.options = options;
        
        me.MAX_SUBPAGES = 3;

        me._registerCurSubpage.call(me,id);
        
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;
        ec.on("pagebeforechange", me.onpagebeforechange, me);
    }

    ,onpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;
        

        if(to == me.ec) {
            
            if(!me.getSubpage('singerdetail_info_' + param.id)){
                
                me._registerCurSubpage.call(me,param.id);

            }
            
            
            me.setCurrentSubpage(me.getSubpage('singerdetail_info_' + param.id));
            
            me.recycleSubpage();
            
            me.$el.show();
        }
    }
    
    , _registerCurSubpage : function(id){
        var me = this;
        
        me._registerSubpage.call(me, 'singerdetail_info_' + id, 'singerdetail_content_info');
        me._registerSubpage.call(me, 'singerdetail_songs_' + id, 'singerdetail_content_songs');
        me._registerSubpage.call(me, 'singerdetail_albums_' + id, 'singerdetail_content_albums');
    }
    
    
    , _registerSubpage : function(id,subview){
    
        var me = this,subView;
        
        subView = new app.subview[ subview ](
            $.extend({}, me.options), 
            me
        );
        me.append(subView);

        me.registerSubpage(id, subView);

        return me;
    }

});

})(Zepto);


