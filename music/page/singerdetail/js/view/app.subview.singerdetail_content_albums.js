
(function($) {

app.subview.singerdetail_content_albums = app.subview.extend({
    
      className: 'albums'
    
    , template: _.template(
        $('#template_singerdetail_content_albums').text()
    )
    
    , events : {
        'click .list li' : 'albumDetail'
    }
    
    ,init: function(options){
        
        var me = this;

        me.isFirstLoad = true;

        me.model = new app.model.singerdetail_albums(null, options);

        me.showLoading(me.$el);
    }

    ,render: function(){
        var me = this;
        
        
        me.$el.append(
            me.template({
                albums: me.model.toJSON()
            })
        );
        
        // 隐藏loading
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
            me.$el.hide(); // bug?
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
            
        }
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


