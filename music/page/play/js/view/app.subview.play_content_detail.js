/**
 * ��ҳContentView��
 */
(function($) {

app.subview.play_content_detail = app.subview.extend({
    

    template: _.template(
        $('#template_play_content').text()
    )

    ,className : 'play_content_detail'


    ,init: function(options){
        var me = this;

        me.isFirstLoad = true;

        // ����collection���ݶ���
        
        me.model = new app.model.play_music(null, options);
        
       
        // չʾloading
        me.showLoading(me.$el);
    }

    ,render: function(){
        var me = this;

        // ʹ��append�����⽫loading���
       
        me.$el.append(
            me.template({
                sing_info: me.model.toJSON()
            })
        );
        
        me._createPlayerBar.call(me);
        
        me.refreshScrollerHeight();
        // ����loading
        
        
        me.hideLoading();

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
                    success: function(){
                        me.isFirstLoad = false;
                    }
                });
            }
            $('#player').hide();
            me.refreshScrollerHeight();
            
        }else{
        
            $('#player').show();
            
        }
    }
    
    ,refreshHeight: function(){
        var me = this;
        window.scrollTo(0, 0);
        app.refreshScroll();
    }
    
    ,_createPlayerBar : function(){
        var 
              me = this
            , tpl = _.template($('#t-player').html())
            , str = tpl({sing_info: me.model.toJSON()})
            ;
        
        $('#player').html(str);
        
        
    }

});

})(Zepto);


