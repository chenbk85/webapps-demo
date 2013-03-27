/**
 * 首页View类
 */
(function($) {

app.pageview.allview = app.pageview.extend({
    el: "#allview_page"

    ,init: function(options){
        var me = this;

        // 创建header子视图
        me.setup(new app.subview.allview_header(options, me));

        // 创建content子视图
        me.setup(new app.subview.allview_content(options, me));
    }

});

})(Zepto);


