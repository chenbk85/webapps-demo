
(function($) {

app.subview.topicdetail_content_detail = app.subview.extend({
    
      template: _.template(
        $('#template_topicdetail_content').text()
    )

    , className: 'topicdetail_content_detail'
    
    , events : {
    
        'click .topic ul li.url' : 'playMusic'
    }
    
    , init: function(options){
        
        var me = this;

        me.isFirstLoad = true;

        me.model = new app.model.topicdetail_music(null, options);

        me.showLoading(me.$el);
    }

    , render: function(){
        var me = this;

        me.$el.append(
            me.template({
                topicdetail: me.model.toJSON()
            })
        );
        
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
                    success: function(){
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
            , route  = 'play/<%= id %>'
            ;
        
        route = _.template(route)({
              id : encodeURIComponent(el.data('songid'))
        });
        
        Backbone.history.navigate(route, {trigger:true});
    }
    

});

})(Zepto);


