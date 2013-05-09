
(function($) {

rocket.subview.albumdetail_content = rocket.subview.extend({
    
    el: "#albumdetail_page_content"

    ,init: function(options){
        var me = this, 
            id = options.id,
            subView,spm;
        
         spm = me.getSubpageManager({
            subpageClass: rocket.subview.albumdetail_content_detail
        });
        
        subView = new rocket.subview.albumdetail_content_detail(
            $.extend({}, options), 
            me
        );
        me.append(subView);

        spm.registerSubpage(me.featureString, subView);
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
        }else{
            me.$el.hide();
        }
    }

});

})(Zepto);


