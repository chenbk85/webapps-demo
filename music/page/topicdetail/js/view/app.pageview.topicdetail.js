/**
 * 首页View类
 */
(function($) {

app.pageview.topicdetail = app.pageview.extend({
    el: "#topicdetail_page"

    ,init: function(options){
        var me = this;
        
        
        
        // 创建header子视图
        me.setup(new app.subview.topicdetail_header(options, me));

        // 创建content子视图
        me.setup(new app.subview.topicdetail_content(options, me));
        
        me.setup(new app.subview.shortcut({action:'topicdetail'}, me));
    }

});

})(Zepto);


