/**
 * 首页ContentView类
 */
(function($) {

app.subview.index_nav = app.subview.extend({
    el: "#index_page_nav"

    ,template: _.template(
        $('#template_index_nav').text()
    )

    ,events: {}

    ,init: function(options){
        var me = this;

        me.isFirstLoad = true;

        // 创建collection数据对象
        
        me.collection = new app.collection.index_music(null, options);
        
       
        // 展示loading
        me.showLoading(me.$el);
    }

    ,render: function(){
        var me = this;

        me.$el.append(
            me.template({
                content: me.collection.toJSON()
            })
        );
        
        me.resetWidth.call(me);
        
        me.hideLoading();

        return me;
    }
    
    
    ,registerEvents: function(){
        var me = this, ec = me.ec;
        ec.on("pagebeforechange", me.onpagebeforechange, me);
        me.collection.on('reset', me.render, me);
        
        
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
        }
    }
    
    ,resetWidth : function(){
        var 
            me = this,
            width = $(window).width(),
            outList = me.$el.find('.outList'),
            outListItem = me.$el.find('.outListItem'),
            identify = me.$el.find('.identify');
        
        outList.width( width * 2);
        outListItem.width( width );
        
        me.$el.find('.navs-opts .prev').on('click',function(){
            
            var outListMarginleft = parseInt( outList.css('marginLeft') ? (outList.css('marginLeft').replace('px','')) : 0,10);
            
            if(outListMarginleft == 0){
                
                return;
            }
            outList.css('marginLeft',outListMarginleft + width);
            
            identify.find('li').removeClass('on');
            identify.find('li.first').addClass('on');
            
        });
        me.$el.find('.navs-opts .next').on('click',function(){
            var outListMarginleft = parseInt( outList.css('marginLeft') ? (outList.css('marginLeft').replace('px','')) : 0,10);
            
            if(outListMarginleft == -width){
                
                return;
            }
            
            outList.css('marginLeft',outListMarginleft - width);
            identify.find('li').removeClass('on');
            identify.find('li.second').addClass('on');
        });
        
    }

});

})(Zepto);


