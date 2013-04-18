
(function($) {

app.subview.artistdetail_content_info = app.subview.extend({
    
      className: 'detail'
    
    , template: _.template(
        $('#template_artistdetail_content_info').text()
    )

    ,init: function(options){
        
        var me = this;

        me.isFirstLoad = true;

        me.model = new app.model.artistdetail_info(null, options);

        me.showLoading(me.$el);
    }

    ,render: function(){
        var me = this;
        
        me.$el.append(
            me.template({
                info: me.model.toJSON()
            })
        );

        me.hideLoading();

        return me;
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;
        ec.on("subpagebeforechange", me.onsubpagebeforechange, me);
        me.model.on('change', me.render, me);
    }
    ,unregisterEvents: function(){
        var me = this, ec = me.ec;
        ec.off('subpagebeforechange', me.onsubpagebeforechange, me);
        me.model.off('change', me.render, me);

    }
    ,onsubpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;

        if(to == me.ec) {
            
            me.$el.show();
            
            if(me.options.panel == 'songs'){
                me.$el.find('.nav-tab span').removeClass('on').parent().find('.songs-panel').addClass('on');  //bug?
            }else{
                me.$el.find('.nav-tab span').removeClass('on').parent().find('.albums-panel').addClass('on');  //bug?
            }
            
            
            if(me.isFirstLoad){
                me.model.fetch({
                    data    : {
                        id : param.id
                    }
                    ,success: function(){
                        me.isFirstLoad = false;
                    }
                });
            }
            
            new app.subview.toolbar({
                  title  : "歌手"
                , action : 'artistdetail'
            }, me);
            
        }
    }
    

    

    , _bindClickEvent : function(){
        var me = this;
        me.$el.parent().find('.songs-panel,.albums-panel').tap(function(){


        });
    }

});

})(Zepto);


