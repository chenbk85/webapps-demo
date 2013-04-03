/**
 * 首页View类
 */
(function($) {

app.pageview.singerhot = app.pageview.extend({
    el: "#singerhot_page"

    ,init: function(options){
        var me = this;

        // 创建header子视图
        me.setup(new app.subview.singerhot_header(options, me));

        // 创建content子视图
        me.setup(new app.subview.singerhot_content(options, me));
    }

});

})(Zepto);


