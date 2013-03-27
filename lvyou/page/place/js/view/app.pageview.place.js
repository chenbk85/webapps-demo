/**
 * 首页View类
 */
(function($) {

app.pageview.place = app.pageview.extend({
    el: "#place_page"

    ,init: function(options){
        var me = this;

        // 创建header子视图
        me.setup(new app.subview.place_header(options, me));

        // 创建content子视图
        me.setup(new app.subview.place_content(options, me));
    }

});

})(Zepto);


