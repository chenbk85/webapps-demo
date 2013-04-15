
(function($) {

app.pageview.singerdetail = app.pageview.extend({
    el: "#singerdetail_page"

    ,init: function(options){
        var me = this;


        me.setup(new app.subview.singerdetail_content(options, me));
        
    }
});

})(Zepto);


