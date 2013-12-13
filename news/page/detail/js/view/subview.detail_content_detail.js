(function($){

var model = require( 'page/detail/js/model/model.detail.js' );
var baidu = require( 'js/common/baidutemplate/baidutemplate.js' );

var tpl_detail_content = require( 'page/detail/tpl/detail.template_detail_content.tpl' );

Chassis.SubView.detail_content_detail = Chassis.SubView.extend({

    className: 'detail_page_content_detail'
    
    // 配置事件
    ,events: {
        // 监听model change
        'change model': 'onModelChange'
    }
    
    ,init: function(options){
        var me = this;
        me.options = options;
        me.showLoading();
        
        
        me.model = new Chassis.Model.Detail();

    }

	
	, onBeforeSwitchIn : function(){
        var me = this;
		this.$el.show();
        
        
        // 获取数据
        me.model.fetch({
            data : {
                id : me.options.id
            }
        });
	}
    
    , onAfterSwitchIn : function(){
        var me = this;
		this.$el.show();
        
	}
    
    ,onModelChange : function(){
        var me = this;
		

        me.$el.html( tpl_detail_content.template( me.model.toJSON() ) );
    }

});

})(Zepto);
