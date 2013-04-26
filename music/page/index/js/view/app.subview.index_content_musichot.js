
(function($) {

rocket.subview.index_content_musichot = rocket.subview.extend({
      el: "#index_page_musichot"

    , template: _.template(
        $('#template_index_musichot').text()
    )

    , events: {
          'tap .songs .hd div' : 'musicHot'
        , 'tap .list li' : 'playMusic'
    }

    , init: function(options){
        var me = this;

        me.isFirstLoad = true;


        options.size = 5;
        
        me.model = new rocket.model.musichot_music(null, options);
        

        me.showLoading(me.$el);
    }

    , render: function(){
        var me = this;

        me.$el.append(
            me.template({
                musichot: me.model.toJSON()
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
    
    , playMusic : function(e){
        var 
              me     = this
            , el     = $(e.target).closest('li')
            , route  = 'song/<%= id %>'
            ;
        
        route = _.template(route)({
            id : encodeURIComponent(el.data('songid'))
        });
        
        Backbone.history.navigate(route, {trigger:true});
    }
    
    , musicHot : function(e){
        var 
              me     = this
            , el     = $(e.target).closest('div')
            , route  = 'musichot'
            ;
        
        route = _.template(route)({
            //
        });
        
        Backbone.history.navigate(route, {trigger:true});
    }


});

})(Zepto);


