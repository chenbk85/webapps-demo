/**
 * 首页ContentView类
 */
(function($) {

app.subview.singerhot_content = app.subview.extend({
    el: "#singerhot_page_content"

    ,template: _.template(
        $('#template_singerhot_content').text()
    )

    ,events: {}

    ,init: function(options){
        var me = this;

        me.isFirstLoad = true;

        // 创建collection数据对象
        
        me.model = new app.model.singerhot_music(null, options);
        
       
        // 展示loading
        me.showLoading(me.$el);
        
        
    }

    ,render: function(){
        var me = this;

        // 使用append，避免将loading冲掉
       
        me.$el.append(
            me.template({
                singerhot: me.model.toJSON()
            })
        );

        // 隐藏loading
        me.hideLoading();
        me.refreshScrollerHeight();
        return me;
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;
        ec.on("pagebeforechange", me.onpagebeforechange, me);
        me.model.on('change', me.render, me);
    }

    ,onpagebeforechange: function(params){
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


