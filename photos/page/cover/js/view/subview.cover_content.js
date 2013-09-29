(function($){
var tpl_app = require( 'page/cover/tpl/cover.tpl' );
Chassis.SubView.cover_content = Chassis.SubView.extend({

      el: '#cover_page_content'
	
	, events : {
		'click .jump' : 'eJump'
	}

    ,init: function(options){
        var me = this;

        me.showLoading();
        me.render();

    }

    

    ,render: function(sections){
        var me = this,_s;
		
		if ( app.isIphone5 ) {
			_s = me.$el.parent().height() + 108;
			
			me.$el.parent().height( _s );
			
		} 
		me.$el.html( tpl_app.template({}) );
        me.hideLoading();
		

		me.$el.find('img').height( _s );
		me.$el.on( 'touchmove',function( e ) {
			e.preventDefault();
		} );
    }
	
	, onBeforePageIn : function(){
		this.$el.show();
		
        

	},
	
	eJump : function(){

		Chassis.history.navigate( '' );
	}
	
	


});

})(Zepto);
