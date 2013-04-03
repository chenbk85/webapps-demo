/**
 * 首页View类
 */
(function($) {

app.pageview.play = app.pageview.extend({
    el: "#play_page"

    ,init: function(options){
        var me = this;
        
        
        
        // 创建header子视图
        me.setup(new app.subview.play_header(options, me));

        // 创建content子视图
        me.setup(new app.subview.play_content(options, me));
        
        me.setup(new app.subview.shortcut({action:'play'}, me));
    }

});

})(Zepto);


