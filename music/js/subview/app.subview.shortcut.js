/**
 * Ê×Ò³ContentViewÀà
 */
(function($) {

app.subview.shortcut = app.subview.extend({

    el: "#shortcut"

    ,template: _.template(
        $('#t-shortcut').text()
    )

    ,events: {}

    ,init: function(options){
        var me = this;
        me.el = '#' + me.options.action + '_page_shortcut';
        me.render.call(me);
    }

    ,render: function(){
        var me = this;

        $(me.el).html(
            me.template({
                options: me.options
            })
        );

        

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
            me.$el.show();
        }
    }

});

})(Zepto);


