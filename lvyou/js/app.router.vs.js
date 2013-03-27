/**
 * vs产品的Router类
 */
(function($) {

app.router.vs = app.router.extend({

    // 路由配置
    routes: {
        '': 'index'
        ,'place/:id' : 'place'
        ,'allview/:id':'allview'

       
    }

    // 页面切换顺序配置
    ,pageOrder: [
        'index'
        ,'place'
        ,'allview'
    ]

    // 位置记忆，默认为false，不进行位置记忆
    ,enablePositionRestore: true

    // 默认页面切换动画
    ,defaultPageTransition: 'slide'

    // 页面切换动画配置
    ,pageTransition: {
        'index-place':'slide'
        ,'place-allview' : 'fade'

    }

    ,index: function(type) {
        if(!type) {
            type = 'focus';
        }
        this.doAction('index', {
                type: decodeURIComponent(type)
            },
            //禁止发送
            {disable: true}
        );
    }

    ,place : function(id){
        if(!id) {
            id = 1;
        }
        this.doAction('place', {
                id: decodeURIComponent(id)
            },
            //禁止发送
            {disable: true}
        );
    }
    ,allview : function(id){
        if(!id) {
            id = 1;
        }
        this.doAction('allview', {
                id: decodeURIComponent(id)
            },
            //禁止发送
            {disable: true}
        );
    }

    ,defaultRoute: function(defaultUrl) {
        Backbone.history.navigate('index', {trigger: true, replace: true});
    }

    /**
     * action处理逻辑
     * @{param} action {string} action名称
     * @{param} params {object} action参数
     * @{param} statOptions {object} 统计选项{disable:是否屏蔽统计,默认开启;param:{key: value,key: value}}]统计参数}
     */
    ,doAction: function(action, params, statOptions){

        app.router.prototype.doAction.apply(this, arguments);
    }

}); 

})(Zepto);




