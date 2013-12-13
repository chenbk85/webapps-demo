(function($){
var toolbar = require( 'js/common/gmu/js/widget/toolbar.js' );
Chassis.SubView.index_header = Chassis.SubView.extend({

    el: '#index_page_header'
	
	, events : {
		'click .btn-baidu'   : 'gotoBaidu',
		'click .btn-product' : 'gotoProduct'
	}
	
    ,init: function(options){
        var me = this;
        $( '#index_page_header_toolbar' ).toolbar();
    }


    ,render: function(sections){
        var me = this;
        // todo
    }

	, onBeforePageIn : function(){
		this.$el.show();
	}
	
	, gotoBaidu : function(){
		window.location.href = 'http://m.baidu.com';
		return false;
	}
	
	, gotoProduct : function(){
		Chassis.history.navigate( 'app' );
	}
});

})(Zepto);
