/**
 * 首页View类
 */
(function($) {

app.pageview.category = app.pageview.extend({
    el: "#index_page"

    ,init: function(options){
        var me = this;

        // 创建header子视图
        me.setup(new app.subview.category_header(options, me));

        // 创建content子视图
        me.setup(new app.subview.category_content(options, me));
    }

});

})(Zepto);


