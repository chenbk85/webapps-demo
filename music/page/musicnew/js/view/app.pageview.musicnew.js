/**
 * 首页View类
 */
(function($) {

app.pageview.musicnew = app.pageview.extend({
    el: "#musicnew_page"

    ,init: function(options){
        var me = this;

        // 创建header子视图
        me.setup(new app.subview.musicnew_header(options, me));

        // 创建content子视图
        me.setup(new app.subview.musicnew_content(options, me));
    }

});

})(Zepto);


