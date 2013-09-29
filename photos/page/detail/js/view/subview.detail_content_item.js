(function($){
var tpl_app = require( 'page/detail/tpl/detail.tpl' ),
	slider      = require( 'js/common/gmu/js/widget/slider.js' );
Chassis.SubView.detail_content_item = Chassis.SubView.extend({

    className: 'detail_page_content_item',
	
	events : {
		'tap .typcn-arrow-left-outline' : 'eBack',
		'tap .typcn-eye-outline'        : 'eIphoneScreen',
		'tap .pics' : 'eToggleTools'
		//,'slideend widget .pics ul li'          : 'sliderend'
	},

    init: function(options){
        var me = this;
		
		me.tag = options.tag;
		
		me.uuid = Chassis.uniqueId( 'm' );
		
        me.showLoading();
		
        me.render();

    },

    

    render: function(sections){
        var me = this,
			data = [];
		
		app._cache = app._cache || [];
		
		me.$el.html( tpl_app.template( {pics:app._cache,id:me.uuid} ) );
		
        me.hideLoading();
		
		
		
		setTimeout( function(){
			
			// model加UI字段
			
			me.$el.find('.pics ul li').each( function( k, v ) {
				data.push( $( v ) );
			} );
			
			
			me.setup( "GMU.Slider",
					{
						el : me.$el.find('.pics ul'), //TODO 使用id会有问题
						model : {
							autoPlay : false,
							showNavi : false,
							showIndicator : false,
							data : function( i ){
								var ret = data[ i ] ? 
									$( '<div></div>' ).append( data[ i ].clone() ).html() : false;
								return ret;
							}
						}
					} 
			); 
			
			
			
			/*
			return;
			
			me.$el.find('.pics ul').slider( {
				autoPlay : false,
				loop     : false,
				showArr  : false,
				slideend : function( e, page ) {
					
				}
			
			} );
			*/
			me.$el.find( '.pic-tools' ).show();
		
		}, 200 );
		
		
		
    },
	
	onBeforeSwitchIn : function() {
		
		this.$el.show();
	},
	
	onAfterSwitchIn : function(){
		var me = this;
		me.$el.show();
		
	},
	
	
	
	eBack : function(){
		history.go( -1 );
	},
	
	sliderend : function(){
		console.log( 3333 );
	},
	
	eToggleTools : function(){
		var me = this;
		me.$el.find( '.pic-tools' ).toggle( 700 );
	},
	
	eIphoneScreen : function(){
		var me = this;
		console.log( 1212 );
		me.$el.find( '.pic-iphone' ).toggle();
	}
	
	


});

})(Zepto);
