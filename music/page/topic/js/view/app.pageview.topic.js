/**
 * 首页View类
 */
(function($) {

app.pageview.topic = app.pageview.extend({
    el: "#topic_page"

    ,init: function(options){
        var me = this;

        // 创建header子视图
        me.setup(new app.subview.topic_header(options, me));

        // 创建content子视图
        me.setup(new app.subview.topic_content(options, me));
    }

});

})(Zepto);


