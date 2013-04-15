/**
 * 首页ContentView类
 */
(function($) {

app.subview.singerdetail_content_info = app.subview.extend({
    
      className: 'detail'
    
    , template: _.template(
        $('#template_singerdetail_content_info').text()
    )

    ,init: function(options){
        
        var me = this;

        me.isFirstLoad = true;

        me.model = new app.model.singerdetail_info(null, options);

        // 展示loading
        me.showLoading(me.$el);
    }

    ,render: function(){
        var me = this;
        
        me.$el.append(
            me.template({
                info: me.model.toJSON()
            })
        );
        
        me.refreshScrollerHeight();
        // 隐藏loading
        me.hideLoading();

        me._bindClickEvent.call(me);
        
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
                    data    : {
                        id : param.id
                    }
                    ,success: function(){
                        me.isFirstLoad = false;
                    }
                });
            }
            
            new app.subview.toolbar({
                  title  : "歌手"
                , action : 'singerdetail'
            }, me);
            
            me.refreshScrollerHeight();
        }
    }
    
    , refreshHeight: function(){
        var me = this;
        window.scrollTo(0, 0);
        app.refreshScroll();
    }
    

    , _bindClickEvent : function(){
        var me = this;
        me.$el.parent().find('.songs-panel,.albums-panel').click(function(){
            var panel = $(this).hasClass('songs-panel') ? 'songs' : 'albums';
            
            
            
            me.$el.parent().find('.songs-panel,.albums-panel').removeClass('on');
            me.$el.parent().find('.' + panel + '-panel').addClass('on');
            
            me.$el.parent().find('.songs,.albums').hide();
            me.$el.parent().find('.' + panel).show();

            me.refreshScrollerHeight();
        });
    }

});

})(Zepto);


