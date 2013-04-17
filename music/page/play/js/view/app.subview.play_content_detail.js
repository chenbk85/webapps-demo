
(function($) {

app.subview.play_content_detail = app.subview.extend({
    

    template: _.template(
        $('#template_play_content').text()
    )

    ,className : 'play_content_detail'


    ,init: function(options){
        var me = this;
        
        me.options = options;

        me.isFirstLoad = true;

        
        me.model = new app.model.play_music(null, options);
        
       
        // 展示loading
        me.showLoading(me.$el);
    }

    ,render: function(){
        var me = this;

        // 使用append，避免将loading冲掉
       
        me.$el.append(
            me.template({
                sing_info: me.model.toJSON()
            })
        );
        
        me._createPlayerBar.call(me);
        me._playerControl.call(me);
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
            if(me.isFirstLoad){
                me.model.fetch({
                    success: function(){
                        me.isFirstLoad = false;
                    }
                });
            }
            $('#player').hide();
            
        }else{
        
            $('#player').show();
            
        }
    }
    

    
    ,_createPlayerBar : function(){
        var 
              me = this
            , tpl = _.template($('#t-player').html())
            , str = tpl({sing_info: me.model.toJSON()})
            ;
        
        $('#player').html(str);
        
        $('#player').click(function(){
            var route = 'play/<%= id %>';
            
            route = _.template(route)({
                  id   : encodeURIComponent(me.options.id)
            });
        
            Backbone.history.navigate(route, {trigger:true});
        });
        
        
    }
    
    , _playerControl : function(){
        var me = this;
        $('.song .player .opt').click(function(){
            var state = $(this).hasClass('play') ? 'play' : 'pause';
            
            if(state == 'play'){
                $(this).removeClass('play').addClass('pause');
            }else{
                $(this).removeClass('pause').addClass('play');
            }
        });
    }

});

})(Zepto);


