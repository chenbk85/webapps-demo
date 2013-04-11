/**
 * 首页ContentView类
 */
(function($) {

app.subview.musicnew_content = app.subview.extend({
    el: "#musicnew_page_content"

    ,template: _.template(
        $('#template_musicnew_content').text()
    )
    
    ,template_item : _.template(
        $('#template_musicnew_content_item').text()
    )
    
    ,events: {}

    ,init: function(options){
        var me = this;

        me.isFirstLoad = true;


        me.model = new app.model.musicnew_music(null, options);
        
       
        // 展示loading
        me.showLoading(me.$el);
    }

    ,render: function(){
        var me = this;
        if(me.model.get('loadCount') == 1){
            me.$el.append(
                me.template({
                    item : me.template_item({
                        musicnew : me.model.toJSON()
                    })
                })
            );
            me._bindMoreEvent.call(me);
        }else{
            $(me.template_item({
                    musicnew: me.model.toJSON()
             })).insertBefore(me.$el.find('.list li.load-more'));

            
        }
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
                    data : {
                        page:me.model.get('page')
                    },
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
    
    /**
     * 绑定更多时的事件
     *
     */
    , _bindMoreEvent : function(){
        var me = this;
        me.$el.find('.load-more').click(function(){
            me.model.off('change');
            me.model.set({
                  page      : 1
                , loadCount : me.model.get('loadCount') + 1
            },{silent:true});
            me.showLoading(me.$el);
            me.model.fetch({
                data : {
                    page : me.model.get('page')
                },
                success: function(){
                    
                    me.render.call(me);
                }
            });
        });
    
    }
   

});

})(Zepto);


