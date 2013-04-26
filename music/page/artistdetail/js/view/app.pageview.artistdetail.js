
(function($) {

rocket.pageview.artistdetail = rocket.pageview.extend({
    el: "#artistdetail_page"

    ,init: function(options){
        var me = this;


        me.setup(new rocket.subview.artistdetail_content(options, me));
        
    }
});

})(Zepto);


