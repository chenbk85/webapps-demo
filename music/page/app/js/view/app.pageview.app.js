/**
 * 首页View类
 */
(function($) {

app.pageview.app = app.pageview.extend({
    el: "#app_page"

    ,init: function(options){
        var me = this;

        // 创建header子视图
        me.setup(new app.subview.app_header(options, me));

        // 创建content子视图
        me.setup(new app.subview.app_content(options, me));
    }

});

})(Zepto);


