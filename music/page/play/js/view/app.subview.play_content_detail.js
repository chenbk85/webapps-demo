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
        }
    }

});

})(Zepto);


