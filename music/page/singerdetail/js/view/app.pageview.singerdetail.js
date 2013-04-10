/**
 * 首页View类
 */
(function($) {

app.pageview.singerdetail = app.pageview.extend({
    el: "#singerdetail_page"

    ,init: function(options){
        var me = this;

        me.setup(new app.subview.toolbar({
            title  : "歌手",
            action : 'singerdetail'
        }, me));

        // 创建header子视图
        me.setup(new app.subview.singerdetail_header(options, me));

        // 创建content子视图
        me.setup(new app.subview.singerdetail_info(options, me));
        //me.setup(new app.subview.singerdetail_songlist(options, me));
    }

});

})(Zepto);


