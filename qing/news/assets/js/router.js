App.router = {
    init: function(router){
		window.location.hash = ''; //清除hash，保证用户第一次进入的是入口页

        router = Chassis.Router.extend( router );
        router = new router();
        Chassis.PageView.index = Chassis.PageView.extend({
            el: '#index_page'
            ,init: function(options){
                var me = this;

                me.render();
            },
            
            render: function(sections){
                
            },
            
            onBeforePageIn : function(){
                //this.$el.show();
            },
			
			onAfterPageIn : function(){
                App.trigger('indexViewIn');
            },

            onBeforePageOut : function(){
                App.trigger('indexViewOut');
            }

        });

        Chassis.PageView.detail = Chassis.PageView.extend({
            el: '#detail_page'

            ,init: function(options){
            },
            
            onBeforePageIn : function(){
                //this.$el.show();
            },

            onBeforePageOut : function(){
                App.trigger('detailViewOut');
            }
        });

        Chassis.PageView.app_info = Chassis.PageView.extend({
            el: '#appinfo_page'

            ,init: function(options){
            },
            
            onBeforePageIn : function(){
                //this.$el.show();
            }
        });

        Chassis.PageView.app_setting = Chassis.PageView.extend({
            el: '#appsetting_page'

            ,init: function(options){
            },
            
            onBeforePageIn : function(){
                //this.$el.show();
            }
        });

        Chassis.PageView.history = Chassis.PageView.extend({
            el: '#history_page'

            ,init: function(options){
            },
            
            onBeforePageIn : function(){
                //this.$el.show();
            }
        });

        Chassis.history.start();
    }
};

App.init();