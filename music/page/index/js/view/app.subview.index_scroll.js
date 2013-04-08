/**
 * 首页ContentView类
 */
(function($) {

app.subview.index_scroll = app.subview.extend({
    el: "#index_page_scroll"

    ,template: _.template(
        $('#template_index_scroll').text()
    )


    ,init: function(options){
        var me = this;

        me.isFirstLoad = true;
        me.render.call(me);
    }

    ,render: function(){
        var me = this;

        me.$el.append(
            me.template({})
        ).show();
        
        me.initAnimation.call(me);
        
        return me;
    }
    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on('pagebeforechange', me.onpagebeforechange, me);
    }
    
    ,onpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;

        if(to == me.ec){
            me.$el.show();
        }
    }
    
    ,initAnimation : function(){
        var 
            me             = this,
            swipe          = me.$el.find('.swipe'),
            identify       = me.$el.find('.identify'),
            swipeUL        = swipe.find('ul'),
            swipeLI        = swipeUL.find('li'),
            screenWidth    = $(window).width(),
            count          = swipeLI.length,
            intervalHandle = null,
            intervalFun    = null,
            cur            = 0
            
            ;
        
        swipeLI.css('width',screenWidth);
        swipeUL.css('width',screenWidth * count);
        
        intervalFun = function(){
            intervalHandle = window.setInterval(function(){
                
                if(cur >= count){
                    cur = 0;
                }
                
                swipeUL.css({
                    '-webkit-transform'  : 'translate3d(-'+ (cur * screenWidth)+'px, 0, 0)'
                });
                
                identify.find('li').removeClass('on');
                identify.find('li').eq(cur).addClass('on');
                cur++;
                
                
            },6000);
            
        };
        
        intervalFun();
    }

});

})(Zepto);


