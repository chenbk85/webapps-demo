
(function($) {

app.subview.index_scroll = app.subview.extend({
      el: "#index_page_scroll"

    , template: _.template(
        $('#template_index_scroll').text()
    )


    , init: function(options){
        var me = this;
        me.isFirstLoad = true;
        me.render.call(me);
    }

    , render: function(){
        var me = this;

        me.$el.append(
            me.template({})
        ).show();
        
        me.refreshScrollerHeight();
        
        me._initOnOrientationChange.call(me);
        me.initAnimation.call(me);
        
        return me;
    }
    
    , registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on('pagebeforechange', me.onpagebeforechange, me);
    }
    
    , onpagebeforechange: function(params){
        var 
              me = this
            , from = params.from
            , to = params.to
            , param = params.params
            ;

        if(to == me.ec){
            me.$el.show();
            me.refreshScrollerHeight();
        }
    }
    
    , refreshHeight: function(){
        var me = this;
        window.scrollTo(0, 0);
        app.refreshScroll();
    }
    
    , _initOnOrientationChange : function(){
        var me = this;
        $(window).bind('orientationchange',function(){
            var 
                  swipe          = me.$el.find('.swipe')
                , identify       = me.$el.find('.identify')
                , swipeUL        = swipe.find('ul')
                , swipeLI        = swipeUL.find('li')
                , screenWidth    = $(window).width()
                , count          = swipeLI.length
                , cur            = parseInt(swipeUL.attr('cur'),10)
                ;
        
            swipeLI.css('width',screenWidth);
            swipeUL.css('width',screenWidth * count);
            
            swipeUL.css({
                  '-webkit-transition' : '0 ease'
                , '-webkit-transform'  : 'translate3d(-'+ (cur * screenWidth)+'px, 0, 0)'
             });
        });
    }
    
    
    , initAnimation : function(){
        var 
              me             = this
            , swipe          = me.$el.find('.swipe')
            , identify       = me.$el.find('.identify')
            , swipeUL        = swipe.find('ul')
            , swipeLI        = swipeUL.find('li')
            , screenWidth    = $(window).width()
            , count          = swipeLI.length
            , intervalHandle = null
            , intervalFun    = null
            , cur            = 0
            ;
        
        swipeLI.css('width',screenWidth);
        swipeUL.css('width',screenWidth * count);
        
        intervalFun = function(){
            intervalHandle = window.setInterval(function(){
                var screenWidth = $(window).width();
                if(cur >= count){
                    cur = 0;
                }
                
                swipeUL.attr('cur',cur).css({
                      '-webkit-transition' : '1s ease'
                    , '-webkit-transform'  : 'translate3d(-'+ (cur * screenWidth)+'px, 0, 0)'
                });
                
                identify.find('li').removeClass('on').eq(cur).addClass('on');
                
                cur++;
                
                
            },6000);
            
        };
        
        //可以使用GMU slider
        intervalFun();
        
    }

});

})(Zepto);


