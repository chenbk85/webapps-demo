
(function($) {

rocket.subview.index_content_artisthot = rocket.subview.extend({
      el: "#index_page_artisthot"

    , template: _.template(
        $('#template_index_artisthot').text()
    )

    , events: {
          'tap .artists li.url'  : 'artistDetail'
        , 'tap .artists li.hdli' : 'artistHot'
    }

    , init: function(options){
        var me = this;

        me.isFirstLoad = true;

        me.model = new rocket.model.artisthot_music(null, options);

        me.showLoading(me.$el);
    }

    , render: function(){
        var me = this;

        
        
        me.$el.append(
            me.template({
                artisthot: me.model.toJSON()
            })
        );

        me.hideLoading();

        return me;
    }

    , registerEvents: function(){
        var me = this, ec = me.ec;
        ec.on("pagebeforechange", me.onpagebeforechange, me);
        me.model.on('change', me.render, me);
    }

    , onpagebeforechange: function(params){
        var 
              me = this
            , from = params.from
            , to = params.to
            , param = params.params
            ;

        if(to == me.ec) {
            me.$el.show();

            if(me.isFirstLoad){
                me.model.fetch({
                    success: function(){
                        me.isFirstLoad = false;
                    }
                });
            }
            
        }
    }
    
    , artistDetail : function(e){
        var 
              me     = this
            , el     = $(e.target).closest('li.url')
            , route  = 'artistdetail/<%= id %>/songs'
            ;
        
        route = _.template(route)({
            id : encodeURIComponent(el.data('songerid'))
        });
        
        Backbone.history.navigate(route, {trigger:true});
    }
    
    , artistHot : function(e){
        var 
              me     = this
            , el     = $(e.target).closest('li')
            , route  = 'artisthot'
            ;
        
        route = _.template(route)({
            //
        });
        
        Backbone.history.navigate(route, {trigger:true});
    }
    


});

})(Zepto);


