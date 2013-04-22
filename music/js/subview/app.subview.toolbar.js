
(function($) {

app.subview.toolbar = app.subview.extend({

      el: "#header"

    , template: _.template(
        $('#t-toolbar').text()
    )

    , events: {
          'tap h1'                 : 'togglemenu'
        , 'tap .right .btn-search' : 'showSearch'
    }

    , init: function(options){
        var me = this;
        me.render.call(me);
    }

    , render: function(){
        var me = this;
        
        me.$el.html(me.template({
            options : me.options
        }));
        

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
        

        if(to == me.ec) {
            me.$el && me.$el.show();
        }else{
            me.remove();
            $('#header').remove();
            $('#wrapper').before('<header id="header"></header>');
        }
    }
    
    , togglemenu : function(e){
        var me = this,self = $(e.target);
        $('.drop-menu').toggle();
        self.hasClass('on') ? self.removeClass('on') : self.addClass('on');
    }
    
    , showSearch : function(e){
        var me = this,self = $(e.target),search = me.$el.find('.search');
        search.hasClass('on') ? search.removeClass('on') : search.addClass('on');
        
        self.hasClass('on') ? self.removeClass('on') : self.addClass('on');

    }

});

})(Zepto);


