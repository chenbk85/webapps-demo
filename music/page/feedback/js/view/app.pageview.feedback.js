/**
 * 首页View类
 */
(function($) {

app.pageview.feedback = app.pageview.extend({
    el: "#feedback_page"

    ,init: function(options){
        var me = this;
        
        // 创建toolbar
        me.setup(new app.subview.toolbar({
              title  : "意见反馈"
        }, me));


        // 创建content子视图
        me.setup(new app.subview.feedback_content(options, me));
    }

});

})(Zepto);


