/**
 * 首页ContentView类
 */
(function($) {

app.subview.topicdetail_content_detail = app.subview.extend({
    
    template: _.template(
        $('#template_topicdetail_content').text()
    )

    ,className: 'topicdetail_content_detail'

    ,init: function(options){
        
        var me = this;

        me.isFirstLoad = true;

        // 创建collection数据对象
        
        me.setup(new app.subview.toolbar({
              title  : me.options.id
            , action : 'categorydetail'
        }, me));
        
        me.model = new app.model.topicdetail_music(null, options);
        
       
        // 展示loading
        me.showLoading(me.$el);
    }

    ,render: function(){
        var me = this;

        // 使用append，避免将loading冲掉
       
        me.$el.append(
            me.template({
                topicdetail: me.collection.toJSON()
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

});

})(Zepto);


