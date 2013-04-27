
(function($) {

rocket.subview.song_content_detail = rocket.subview.extend({
    

      template: _.template(
        $('#template_song_content').text()
    )

    , className : 'song_content_detail'


    , init: function(options){
        var me = this;
        
        me.options = options;

        me.isFirstLoad = true;

        me.model = new rocket.model.song_music(null, options);

        me.showLoading(me.$el);
    }

    ,render: function(){
        var me = this;

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
            
            if(me.options.id == param.id){
                me.$el.show();
            }else{
                me.$el.hide();
            }
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
        
        $('#player').tap(function(){
            var route = 'song/<%= id %>';
            
            route = _.template(route)({
                  id   : encodeURIComponent(me.options.id)
            });
        
            Backbone.history.navigate(route, {trigger:true});
        });
        
        
    }
    
    , _playerControl : function(){
        var me = this;
        
        $('.song .player .opt').tap(function(){
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


