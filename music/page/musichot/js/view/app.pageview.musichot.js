/**
 * 首页View类
 */
(function($) {

app.pageview.musichot = app.pageview.extend({
    el: "#musichot_page"

    ,init: function(options){
        var me = this;
        
        me.setup(new app.subview.toolbar({
              title  : "热歌榜"
            , action : 'musichot'
        }, me));


        // 创建content子视图
        me.setup(new app.subview.musichot_content(options, me));
        
        me.setup(new app.subview.shortcut({action:'musichot'}, me));
    }

});

})(Zepto);


