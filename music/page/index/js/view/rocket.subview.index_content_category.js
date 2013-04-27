
(function($) {

rocket.subview.index_content_category = rocket.subview.extend({

      el: "#index_page_category"

    , template: _.template(
        $('#template_index_category').text()
    )

    , events: {
          'tap .tags .hd'    : 'categoryAll'
        , 'tap .tags li.url' : 'categoryDetail'
    }

    , init: function(options){
        var me = this;

        me.isFirstLoad = true;

        me.collection = new rocket.collection.category_music(null, options);

        me.showLoading(me.$el);
    }

    , render: function(){
        var me = this;


        me.$el.append(
            me.template({
                category: me.collection.toJSON()
            })
        );
        me.hideLoading();

        return me;
    }

    , registerEvents: function(){
        var me = this, ec = me.ec;
        ec.on("pagebeforechange", me.onpagebeforechange, me);
        me.collection.on('reset', me.render, me);
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
                me.collection.fetch({
                    success: function(){
                        me.isFirstLoad = false;
                    }
                });
            }
            
        }
    }
    
    , categoryDetail : function(e){
        var 
              me     = this
            , el     = $(e.target).closest('li.url')
            , route  = 'categorydetail/<%= label %>'
            ;
        
        route = _.template(route)({
            label : encodeURIComponent(el.data('label'))
        });
        
        Backbone.history.navigate(route, {trigger:true});
    }
    
    , categoryAll : function(e){
        var 
              me     = this
            , el     = $(e.target).closest('.hd')
            , route  = 'category'
            ;
        
        route = _.template(route)({
            //
        });
        
        Backbone.history.navigate(route, {trigger:true});
    }

});

})(Zepto);


