(function($){

var baidu = require( 'js/common/baidutemplate/baidutemplate.js' );
var tpl_nav = require( 'page/index/tpl/index.index-template_nav.tpl' );
Chassis.SubView.index_nav = Chassis.SubView.extend({

    el: '#index_page_nav'
	
	, events : {
		'click .item' : 'changeCate'
	}
	
    ,init: function(options){
        var me = this;
		me.render(options);
		
    }


    ,render: function(opts){
        var me = this,
			html = tpl_nav.template(app);
        
		
		me.$el.html( html );
		
		opts.id = opts.id || 0;
		this.$el.find( 'li' ).removeClass( 'select' );
        this.$el.find( 'li' ).each( function(k, v){
			if( $(v).attr('data-id') == opts.id ){
				$(v).addClass( 'select' );
				return false;
			}
		} );
		
    }

	, onBeforePageIn : function(){
		this.$el.show();
	}
	
	, changeCate : function( e ){
		var el = $( e.target ),
			category = el.attr( 'data-id' );
			

		
		this.$el.find( 'li' ).removeClass( 'select' );
		el.addClass( 'select' );
		
		Chassis.history.navigate( 'index/' + category, {trigger:false} );
		
		this.root.trigger( 'update',{id:category} );
	}

});

})(Zepto);
