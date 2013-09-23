(function($){
var tpl_app = require( 'page/detail/tpl/detail.tpl' ),
	slider      = require( 'js/common/gmu/js/widget/slider.js' );
Chassis.SubView.detail_content = Chassis.SubView.extend({

    el: '#detail_page_content',
	
	events : {
		'tap .typcn-arrow-left-outline' : 'eBack'
	},

    init: function(options){
        var me = this;
		
		me.tag = options.tag;
		
        me.showLoading();
        me.render();

    },

    

    render: function(sections){
        var me = this;
		
		app._cache = app._cache || [];
		
		$( '#pics ul' ).html( tpl_app.template( {pics:app._cache} ) );
		
        me.hideLoading();
		
		$('#pics ul').slider( {
			autoPlay : false,
			loop     : false,
            showArr  : false,
            slideend : function( e, page ) {
                console.log( 1 );
            }
		
		} );
		
		me.$el.find( '#pic-tools' ).show();
    },
	
	onBeforePageIn : function(){
		this.$el.show();
	},
	

	
	eBack : function(){
		history.go( -1 );
	}
	
	


});

})(Zepto);
