
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

        me.render.call(me);
       
    }

    ,render: function(){
        var me = this;

        me.$el.append(
            me.template({})
        ).show();
        me.refreshScrollerHeight();
        me.resetWidth.call(me);

        return me;
    }
    
    
    ,registerEvents: function(){
        var me = this, ec = me.ec;
        ec.on("pagebeforechange", me.onpagebeforechange, me);
    }
    
    ,onpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;
        if(to == me.ec){
            me.$el.show();
            me.refreshScrollerHeight();

        }
    }
    ,refreshHeight: function(){
        var me = this;
        window.scrollTo(0, 0);
        app.refreshScroll();
    }
    ,resetWidth : function(){
        var 
            me                   = this,
            width                = $(window).width(),
            outList              = me.$el.find('.outList'),
            outListItem          = me.$el.find('.outListItem'),
            identify             = me.$el.find('.identify'),
            identifyLI           = identify.find('li');
        
       
        
        outList.width( width * 2);
        outListItem.width( width );
        
        me.$el.find('.navs-opts .prev').on('click',function(){

            outList.css({
                '-webkit-transform'  : 'translate3d(0, 0, 0)'
            });
            
            identifyLI.removeClass('on');
            identifyLI.eq(0).addClass('on');
            
        });
        me.$el.find('.navs-opts .next').on('click',function(){
           
            outList.css({
                '-webkit-transform'  : 'translate3d(-'+ (width)+'px, 0, 0)'
            });
            
            identifyLI.removeClass('on');
            identifyLI.eq(1).addClass('on');
        });
        
    }

});

})(Zepto);


