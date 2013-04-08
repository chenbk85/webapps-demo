/**
 * 首页ContentView类
 */
(function($) {

app.subview.categorydetail_content_detail = app.subview.extend({
   
    template: _.template(
        $('#template_categorydetail_content').text()
    )

    ,className : 'categorydetail_content_detail'

    ,init: function(options){
        
        var me = this;

        me.isFirstLoad = true;

        
        me.model = new app.model.categorydetail_music(null, options);

        me.showLoading(me.$el);
        
    }

    ,render: function(){
        var me = this;


        me.$el.append(
            me.template({
                categorydetail: me.model.toJSON()
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
            if(me.isFirstLoad){
                me.model.fetch({
                    success: function(){
                        me.isFirstLoad = false;
                    }
                });
            }
            
            new app.subview.toolbar({
                  title  : me.options.id
            }, me);
        }
    }

});

})(Zepto);


