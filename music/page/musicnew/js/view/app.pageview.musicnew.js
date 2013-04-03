/**
 * 首页View类
 */
(function($) {

app.pageview.musicnew = app.pageview.extend({
    el: "#musicnew_page"

    ,init: function(options){
       var me = this;
        
        me.setup(new app.subview.toolbar({
              title  : "新歌榜"
            , action : 'musicnew'
        }, me));


        // 创建content子视图
        me.setup(new app.subview.musicnew_content(options, me));
        
        me.setup(new app.subview.shortcut({action:'musicnew'}, me));
    }

});

})(Zepto);


