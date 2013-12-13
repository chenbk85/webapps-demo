(function($){

Chassis.SubView.detail_ad = Chassis.SubView.extend({
    
    // 设置SubView所在的DOM
    className: 'detail_page_ad',

    init: function( opts ) {
		this.opts = $.extend({}, opts);
		
		this.opts.img = {
			src    : 'http://wap.baidu.com/static/news/r/image/2013-08-19/b517b85a0098e4d69729e40f71c057c7.jpg',
			width  : 640,
			height : 102
		};
        this.$el.html( '<img src="' + this.opts.img.src + '" />' );
    },
	
	_onOrientationChange : function( e ){
		this.setImgWidth();
	},
	
	onBeforePageIn : function(){
		var me = this;
		me.setImgWidth();
		
		$(window).on( 'orientationchange', function( e ){
			me._onOrientationChange( e );
		} );
		me.$el.show();
	},
	
	onAfterPageOut : function(){
		
		$(window).off('orientationchange');
		this.$el.hide();
	},
	
	setImgWidth : function(){
		var me = this,
			d  = Math.abs(window.orientation) === 90 ?  480: 320,
			w  = Math.min( d, me.opts.img.width ),
			h  = (w / me.opts.img.width) * me.opts.img.height;
		
		me.$el.find( 'img' ).css({
			width  : w,
			height : h
		});
	}
	
	
} );

})(Zepto);