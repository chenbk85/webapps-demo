
(function($) {

app.pageview.albumdetail = app.pageview.extend({
      el: "#albumdetail_page"

    , init: function(options){
        var me = this;


        me.setup(new app.subview.albumdetail_content(options, me));

        me.setup(new app.subview.shortcut({}, me));
    }
    

});

})(Zepto);


