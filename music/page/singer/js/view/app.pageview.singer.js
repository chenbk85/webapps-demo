/**
 * 首页View类
 */
(function($) {

app.pageview.singer = app.pageview.extend({
    el: "#singer_page"

    ,init: function(options){
        var me = this;

        me.setup(new app.subview.toolbar({
            title  : "歌手",
            action : 'singer'
        }, me));

        // 创建header子视图
        me.setup(new app.subview.singer_header(options, me));

        // 创建content子视图
        me.setup(new app.subview.singer_content(options, me));
    }

});

})(Zepto);


