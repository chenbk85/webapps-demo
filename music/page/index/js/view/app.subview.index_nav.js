
(function($) {

app.subview.index_nav = app.subview.extend({
      el: "#index_page_nav"

    , template: _.template(
        $('#template_index_nav').text()
    )

    , events: {
        'tap .navs .nav li.url' : 'gotoRouter'
    }

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
        
        me._initOnOrientationChange.call(me);
        me._initAnimate.call(me);
        
        return me;
    }
    
    
    , registerEvents: function(){
        var me = this, ec = me.ec;
        ec.on("pagebeforechange", me.onpagebeforechange, me);
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

        }
    }

    
    , _initOnOrientationChange : function(){
        var me = this;
        
        $(window).bind('orientationchange',function(){
            var 
                  width                = $(window).width()
                , outList              = me.$el.find('.outList')
                , outListItem          = me.$el.find('.outListItem')
                , cur                  = parseInt(outList.attr('cur'),10)
                ;

        
            outList.width( width * 2);
            outListItem.width( width );

            outList.css({
                  '-webkit-transition' : '0 ease'
                , '-webkit-transform'  : 'translate3d(-'+ (cur * width ) +'px, 0, 0)'
             });
        });
    }
    
    
    , _initAnimate : function(){
        var 
              me                   = this
            , width                = $(window).width()
            , outList              = me.$el.find('.outList')
            , outListItem          = me.$el.find('.outListItem')
            , identify             = me.$el.find('.identify')
            , identifyLI           = identify.find('li')
            ;
        
       
        
        outList.width( width * 2);
        outListItem.width( width );
        
        me.$el.find('.navs-opts .prev').tap(function(){
            var width = $(window).width();
            
            outList.attr('cur',0).css({
                  '-webkit-transition' : '0.6s ease'
                , '-webkit-transform'  : 'translate3d(0, 0, 0)'
            });
            
            identifyLI.removeClass('on').eq(0).addClass('on');
            
        });
        
        me.$el.find('.navs-opts .next').tap(function(){
            var width = $(window).width();
           
            outList.attr('cur',1).css({
                 '-webkit-transition' : '0.6s ease'
                , '-webkit-transform' : 'translate3d(-'+ (width)+'px, 0, 0)'
            });
            
            identifyLI.removeClass('on').eq(1).addClass('on');
        });
        

        me.$el.find('li.url').unbind('touchstart').unbind('touchend').bind('touchstart',function(){
            $(this).addClass('active');
        }).bind('touchend',function(){
            $(this).removeClass('active');
        });
        
    }
    
    , gotoRouter : function(e){
        var 
              me     = this
            , el     = $(e.target).closest('li.url')
            , route  = el.data('url')
            ;

        Backbone.history.navigate(route, {trigger:true});
    }

});

})(Zepto);


