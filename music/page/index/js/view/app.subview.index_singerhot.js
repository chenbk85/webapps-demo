
(function($) {

app.subview.index_singerhot = app.subview.extend({
      el: "#index_page_singerhot"

    , template: _.template(
        $('#template_index_singerhot').text()
    )

    , events: {
          'click .artists li.url'  : 'singerDetail'
        , 'click .artists li.hdli' : 'singerHot'
    }

    , init: function(options){
        var me = this;

        me.isFirstLoad = true;

        me.model = new app.model.singerhot_music(null, options);

        me.showLoading(me.$el);
    }

    , render: function(){
        var me = this;

        
        
        me.$el.append(
            me.template({
                singerhot: me.model.toJSON()
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
    
    , singerDetail : function(e){
        var 
              me     = this
            , el     = $(e.target).closest('li.url')
            , route  = 'singerdetail/<%= id %>'
            ;
        
        route = _.template(route)({
            id : encodeURIComponent(el.data('songerid'))
        });
        
        Backbone.history.navigate(route, {trigger:true});
    }
    
    , singerHot : function(e){
        var 
              me     = this
            , el     = $(e.target).closest('li')
            , route  = 'singerhot'
            ;
        
        route = _.template(route)({
            //
        });
        
        Backbone.history.navigate(route, {trigger:true});
    }
    


});

})(Zepto);


