
(function($) {

rocket.subview.topicdetail_content_detail = rocket.subview.extend({
    
      template: _.template(
        $('#template_topicdetail_content').text()
    )

    , className: 'topicdetail_content_detail'
    
    , events : {
    
        'tap .topic ul li.url' : 'playMusic'
    }
    
    , init: function(options){
        
        var me = this;

        me.isFirstLoad = true;

        me.model = new rocket.model.topicdetail_music(null, options);

        me.showLoading(me.$el);
    }

    , render: function(){
        var me = this;

        me.$el.append(
            me.template({
                topicdetail: me.model.toJSON()
            })
        );
        
        me._bindTouchEvent.call(me);
        me.hideLoading();

        return me;
    }

    , registerEvents: function(){
        var me = this, ec = me.ec;
        ec.on("subpagebeforechange", me.onsubpagebeforechange, me);
        me.model.on('change', me.render, me);
    }
    , unregisterEvents: function(){
        var me = this, ec = me.ec;

        ec.off('subpagebeforechange', me.onsubpagebeforechange, me);
        me.model.off('change', me.render, me);

    }
    , onsubpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;

        if(to == me.ec) {
            if(me.options.id == param.id){
                me.$el.show();
            }else{
                me.$el.hide();
            }
            if(me.isFirstLoad){
                me.model.fetch({
                    success: function(){
                        me.isFirstLoad = false;
                    }
                });
            }
            
            new rocket.subview.toolbar({
                  title  : decodeURIComponent(me.options.name)
            }, me);
            
            
        }
    }
    /**
     * ��touch�¼�
     *
     */
    , _bindTouchEvent : function(){
        var me = this;
        me.$el.find('li.url').highlight('active');
    
    }
    , playMusic : function(e){
         var 
              me     = this
            , el     = $(e.target).closest('li.url')
            , route  = 'song/<%= id %>'
            ;
        
        route = _.template(route)({
              id : encodeURIComponent(el.data('songid'))
        });
        
        Backbone.history.navigate(route, {trigger:true});
    }
    

});

})(Zepto);


