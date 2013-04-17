
(function($) {

app.subview.albumdetail_content_detail = app.subview.extend({
    
      template: _.template(
        $('#template_albumdetail_content').text()
    )

    , className: 'albumdetail_content_detail'
    
    , events : {
        'click .album .list li.url' : 'playMusic'
    }
    
    , init: function(options){
        
        var me = this;

        me.isFirstLoad = true;


       
        
        me.model = new app.model.albumdetail_music(null, options);
        
       
        // 展示loading
        me.showLoading(me.$el);
    }

    , render: function(){
        var me = this;

        // 使用append，避免将loading冲掉
       
        me.$el.append(
            me.template({
                albumdetail: me.model.toJSON()
            })
        );
        
        // 隐藏loading
        me.hideLoading();

        return me;
    }

    , registerEvents: function(){
        var me = this, ec = me.ec;
        ec.on("subpagebeforechange", me.onsubpagebeforechange, me);
        me.model.on('change', me.render, me);
    }
    , unregisterEvents: function(){
        var me = this, ec = me.ec;

        ec.off('subpagebeforechange', me.onsubpagebeforechange, me);
        me.model.off('change', me.render, me);

    }
    , onsubpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;

        if(to == me.ec) {
            me.$el.show();
            if(me.isFirstLoad){
                me.model.fetch({
                      data : {
                        id : param.id
                      }
                    , success: function(){
                        me.isFirstLoad = false;
                    }
                });
            }
            
            new app.subview.toolbar({
                  title  : decodeURIComponent(me.options.name)
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
    

});

})(Zepto);


