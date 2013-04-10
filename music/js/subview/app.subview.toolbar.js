
(function($) {

app.subview.toolbar = app.subview.extend({

    el: "#header"

    ,template: _.template(
        $('#t-toolbar').text()
    )

    ,events: {}

    ,init: function(options){
        var me = this;
        me.render.call(me);
    }

    ,render: function(){
        var me = this;
        
        me.$el.html(me.template({
            options: me.options
        }));
        
        me.bindClickEvent.call(me);
        me.bindSearchEvent.call(me);
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
        

        if(to == me.ec) {
            me.$el && me.$el.show();
        }
    }
    
    ,bindClickEvent : function(){
        var me = this;
        
        me.$el.find('h1').click(function(){
            var self = $(this);
            $('.drop-menu').toggle();
            
            self.hasClass('on') ? self.removeClass('on') : self.addClass('on');
        });
        
        
    }
    
    ,bindSearchEvent : function(){
        var me = this;
        
        me.$el.find('.right .btn-search').click(function(){
            var self = $(this),search = me.$el.find('.search');
            search.hasClass('on') ? search.removeClass('on') : search.addClass('on');
            
            self.hasClass('on') ? self.removeClass('on') : self.addClass('on');
        });
        
        
    }

});

})(Zepto);


