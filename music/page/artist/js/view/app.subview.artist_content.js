
(function($) {

app.subview.artist_content = app.subview.extend({
    el: "#artist_page_content"

    ,template: _.template(
        $('#template_artist_content').text()
    )
    
    ,template_item : _.template(
        $('#template_artist_content_item').text()
    )
    
    ,events: {
        'click li.url' : 'artistDetail'
    }

    ,init: function(options){
        var me = this;

        me.isFirstLoad = true;


        me.model = new app.model.artist_music(null, options);
        
       
        // 展示loading
        me.showLoading(me.$el);
    }

    ,render: function(){
        var me = this,item;
        
        item = me.template_item({
                    artist : me.model.toJSON()
                });
                
        if(me.model.get('page') == 0){
            me.$el.append(
                me.template({
                    item : item
                })
            );
            me.hideLoading();
            me._bindMoreEvent.call(me);
        }else{
            $(item).insertBefore(me.$el.find('.list li.load-more'));

            
        }
        
        me._bindTouchEvent.call(me);
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
        }
    }
    

    
    /**
     * 绑定更多时的事件
     *
     */
    , _bindMoreEvent : function(){
        var me = this;
        me.$el.find('.load-more').click(function(){
            var that = $(this),loadingMore = app.loadingMore(that);
            me.model.off('change');
            me.model.set({
                  page      : me.model.get('page') + 1
            },{silent:true});
            //me.showLoading(me.$el);  //防止白屏
            loadingMore.show();
            me.model.fetch({
                data : {
                    page : me.model.get('page')
                },
                success: function(){
                    me.render.call(me);
                    loadingMore.hide();
                }
            });
        });
    
    }
    /**
     * 绑定touch事件
     *
     */
    , _bindTouchEvent : function(){
        var me = this;
        me.$el.find('li.url').unbind('touchstart').unbind('touchend').bind('touchstart',function(){
            $(this).addClass('active');
        }).bind('touchend',function(){
            $(this).removeClass('active');
        });
    
    }
    , artistDetail : function(e){
         var 
              me     = this
            , el     = $(e.target).closest('li.url')
            , route  = 'artistdetail/<%= id %>'
            ;
        
        route = _.template(route)({
            id : encodeURIComponent(el.data('artistid'))
        });
        
        Backbone.history.navigate(route, {trigger:true});
    }
});

})(Zepto);


