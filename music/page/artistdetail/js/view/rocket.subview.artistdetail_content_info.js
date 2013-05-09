
(function($) {

rocket.subview.artistdetail_content_info = rocket.subview.extend({
    
      className: 'detailinfo'
    
    , template: _.template(
        $('#template_artistdetail_content_info').text()
    )
    
    , events : {
    
          'tap .songs .list li.url' : 'playMusic'
        , 'tap .albums .list li'    : 'albumDetail'
    }
    
    ,init: function(options){
        
        var me = this;

        me.isFirstLoad = true;

        me.model = new rocket.model.artistdetail_info(null, options);

        me.showLoading(me.$el);
    }

    ,render: function(){
        var me = this;
        
        me.$el.append(
            me.template({
                  info  : me.model.toJSON()['info']
                , albums  : me.model.toJSON()['albums']['albumlist']
                , songs  : me.model.toJSON()['songs']['songlist']
                , panel : me.options.panel
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
           
            if(param.panel == 'songs'){
                
                me.$el.find('.albums-panel').removeClass('on');
                me.$el.find('.songs-panel').addClass('on'); 
                me.$el.find('.songs').show();
                me.$el.find('.albums').hide();
            }else{
               
                me.$el.find('.albums-panel').addClass('on');
                me.$el.find('.songs-panel').removeClass('on');
                
                me.$el.find('.songs').hide();
                me.$el.find('.albums').show();
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
            
            new rocket.subview.toolbar({
                  title  : "歌手"
                , action : 'artistdetail'
            }, me);
            
        }
    }
    
    , playMusic : function(e){
         var 
              me     = this
            , el     = $(e.target).closest('li.url')
            , route  = 'song/<%= id %>'
            ;
        
        route = _.template(route)({
            id : encodeURIComponent(el.data('songid'))
        });
        
        Backbone.history.navigate(route, {trigger:true});    
    }
    
    , albumDetail : function(e){
         var 
              me     = this
            , el     = $(e.target).closest('li.url')
            , route  = 'albumdetail/<%= id %>/<%= name %>'
            ;
        
        route = _.template(route)({
              id : encodeURIComponent(el.data('albumid'))
            , name  : encodeURIComponent(el.data('albumtitle'))
        });
        
        Backbone.history.navigate(route, {trigger:true});  
    }

});

})(Zepto);


