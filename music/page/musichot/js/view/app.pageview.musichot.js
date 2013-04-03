/**
 * 首页View类
 */
(function($) {

app.pageview.musichot = app.pageview.extend({
    el: "#musichot_page"

    ,init: function(options){
        var me = this;

        // 创建header子视图
        me.setup(new app.subview.musichot_header(options, me));

        // 创建content子视图
        me.setup(new app.subview.musichot_content(options, me));
    }

});

})(Zepto);


