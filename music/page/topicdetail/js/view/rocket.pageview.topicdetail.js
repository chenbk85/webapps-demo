
(function($) {

rocket.pageview.topicdetail = rocket.pageview.extend({
      el: "#topicdetail_page"

    , init: function(options){
        var me = this;


        me.setup(new rocket.subview.topicdetail_content(options, me));

        me.setup(new rocket.subview.shortcut({}, me));
    }
    

});

})(Zepto);


