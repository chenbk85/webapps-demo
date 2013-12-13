(function($){

var baidu = require( 'js/common/baidutemplate/baidutemplate.js' );
var toolbar = require( 'js/common/gmu/js/widget/toolbar.js' );
var tpl_detail = require( 'page/detail/tpl/detail.tpl' );
Chassis.SubView.detail_header = Chassis.SubView.extend({

    className: 'detail_page_header'

    ,events: {
        'click .ui-toolbar-backbtn': 'onbackbtn'
    }

    ,template : $( '#template_detail_header' ).html()
    
    ,init: function(options){
        var me = this;
        me.render();
		
		
    }

    ,render: function(){
        var me = this,tpl = tpl_detail.template({});
        
        me.$el.html( tpl );
		
		console.log( '121212' );
		
		me.$el.find( '.header_toolbar' ).toolbar();
    }

    , onBeforePageIn : function( e ){
		this.$el.show();
		
		// todo bug
		
		if( !(e.params && e.params.cid) ){
			this.$el.find( '.header_toolbar h2' ).html( 'App' );
			return;
		}
		
		this.cid = e.params.cid;
		
		

		this.$el.find( '.header_toolbar h2' ).html( app.nav[ this.cid ] );

	}
	
	, onAfterPageOut : function(){
		this.$el.find( '.header_toolbar h2' ).html( 'App' );
	}

    ,onbackbtn: function(e){
		
		if( this.cid && /^\d+$/.test(this.cid) ){
			Chassis.history.navigate('index/' + this.cid);
			return;
		}
		
		history.go(-1);
        
    }
});

})(Zepto);
