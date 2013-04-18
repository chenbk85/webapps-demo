
(function($) {

app.subview.index_content = app.subview.extend({
      el: "#index_page_content"

    , init: function(options){
        var 
              me = this
            , id = options.id
            , subView
            ;


        me.setup(new app.subview.index_content_cover(options, me));
        me.setup(new app.subview.index_content_category(options, me));
        me.setup(new app.subview.index_content_artisthot(options, me));
        me.setup(new app.subview.index_content_musichot(options, me));
    }

    

    ,registerEvents: function(){
        var me = this, ec = me.ec;
        ec.on("pagebeforechange", me.onpagebeforechange, me);
    }

    ,onpagebeforechange: function(params){
        var 
              me = this
            , from = params.from
            , to = params.to
            , param = params.params
            ;

        if(to == me.ec) {
            me.$el.show();
        }
    }

});

})(Zepto);


