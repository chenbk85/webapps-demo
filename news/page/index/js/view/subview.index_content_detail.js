(function($){

var Model = require( 'page/index/js/model/model.index.js' );
var baidu = require( 'js/common/baidutemplate/baidutemplate.js' );
var refresh = require( 'js/common/gmu/js/widget/refresh.js' );
var tpl_index = require( 'page/index/tpl/index.tpl' );
var tpl_refresh = require( 'page/index/tpl/index.index-template_ui-refresh-down.tpl' );



Chassis.SubView.index_content_detail = Chassis.SubView.extend({

    className: 'index_page_content_detail'
    
    // 配置事件
    ,events: {
        // 监听model change
         'change model': 'onModelChange'
		,'click .item' : 'gotoDetail'
    }
    
    ,init: function(options){
		
        var me = this;
        me.options = $.extend({id:0},options);
        me.showLoading();
        
        
        me.model = new Chassis.Model.Index();
		
		me.model.fetch({
            data : {
                id : me.options.id
            }
        });

    }

	
	, onBeforeSwitchIn : function(){
        var me = this;

        
	}
    
    , onAfterSwitchIn : function(){
        var me = this;
		this.$el.show();
        
	}
    
    ,onModelChange : function(){
		var me = this,
			json = this.model.toJSON();
		
		json.news.cid = this.options.id;
        // 渲染模板并输出
		// 防止在高度变化时闪屏
		
		
		if ( this.refresh ) {
			this.$el.find('.ui-refresh-down').before( 
				tpl_index.template( json )
			).parent().css({
				height : 'auto'
			});
			me.ready.afterDataLoading();
			return;
		} else {
			var small = tpl_refresh.template({});

			this.$el.html( 
				tpl_index.template(json) + small
			).parent().css({
				height : 'auto'
			});
		}
		
        
		
		
		this.refresh = true;
		this.$el.refresh({
			ready: function (dir, type) {
				var that = this,
					json = me.model.toJSON(),
					ts;
				
				me.ready = that;
				
				$.each( json.news, function(k,v){
					if (v.ts) {
						ts = parseInt(v.ts)/1000;
					}
				});
				
				me.model.fetch({
					data : {
						category : me.options.id,
						ts       : ts
					}
				});
				
			}
		
		});
    },
	
	gotoDetail : function( e ){
		var el = $( e.target ),
			id,
			cid;
		
		while( !el.hasClass( 'item' ) ){
			el = el.parent();
		}
		
		id = el.attr( 'data-id' );
		cid = el.attr( 'data-cid' );
		Chassis.history.navigate( 'detail/' + id + '/' + cid );
	}

});

})(Zepto);
