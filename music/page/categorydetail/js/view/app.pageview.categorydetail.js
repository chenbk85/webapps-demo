/**
 * 首页View类
 */
(function($) {

app.pageview.categorydetail = app.pageview.extend({
    el: "#categorydetail_page"

    ,init: function(options){
        var me = this;

        // 创建header子视图
        me.setup(new app.subview.categorydetail_header(options, me));

        // 创建content子视图
        me.setup(new app.subview.categorydetail_content(options, me));
    }

});

})(Zepto);


