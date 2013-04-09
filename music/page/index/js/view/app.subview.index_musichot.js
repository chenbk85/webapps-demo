
(function($) {

app.subview.index_musichot = app.subview.extend({
    el: "#index_page_musichot"

    ,template: _.template(
        $('#template_index_musichot').text()
    )

    ,events: {}

    ,init: function(options){
        var me = this;

        me.isFirstLoad = true;


        options.size = 5;
        me.collection = new app.collection.musichot_music(null, options);
        

        me.showLoading(me.$el);
    }

    ,render: function(){
        var me = this;

        me.$el.append(
            me.template({
                musichot: me.collection.toJSON()
            })
        );
        
        me.refreshScrollerHeight();
        me.hideLoading();

        return me;
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;
        ec.on("pagebeforechange", me.onpagebeforechange, me);
        me.collection.on('reset', me.render, me);
        me.$el.find('.list li').on('click',me.click,me);
    }
    ,click : function(e){

    }
    
    ,onpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;

        if(to == me.ec) {
            me.$el.show();

            if(me.isFirstLoad){
                me.collection.fetch({
                    success: function(){
                        me.isFirstLoad = false;
                    }
                });
            }
            
            me.refreshScrollerHeight();
        }
    }
    ,refreshHeight: function(){
        var me = this;
        window.scrollTo(0, 0);
        app.refreshScroll();
    }

});

})(Zepto);


