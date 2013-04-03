/**
 * 首页View类
 */
(function($) {

app.pageview.index = app.pageview.extend({
    el: "#index_page"

    ,init: function(options){
        var me = this;
        me.MAX_SUBPAGES = 9;
        // 创建toolbar
        me.setup(new app.subview.toolbar({
              title  : "百度音乐"
            , action : 'index'
        }, me));
        
        

        // 创建子视图
        me.setup(new app.subview.index_scroll(options, me));
        me.setup(new app.subview.index_nav(options, me));
        me.setup(new app.subview.index_cover(options, me));
        me.setup(new app.subview.index_category(options, me));
        me.setup(new app.subview.index_singerhot(options, me));
        me.setup(new app.subview.index_musichot(options, me));
        me.setup(new app.subview.index_bottom(options, me));
    }

});

})(Zepto);


