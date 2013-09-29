( function ( $ ) {

var tpl_tag = require( 'page/index/tpl/tag.tpl' ),
	panel   = require( 'js/common/gmu/js/widget/panel.js' );


Chassis.SubView.index_tag = Chassis.SubView.extend( {

    el: '#index_page_panel',
	
	events : {
		'tap .index_page_tag li' : 'onTagChage'
	},

    init: function( options ) {
        var me = this;

		me.tag = options.tag || 'pp_meinv_hd';

		me.$el.find( '.index_page_tag' ).html( tpl_tag.template( app.tag ) );
		
		me._repair.call( me );
		
		me.$el.find('.panel').panel( {
            contentWrap: me.$el.parent().find('#index_page_content')
        } );
		
		me.root.on( 'panel', function ( options ) {
			me.panelUI = me.panel || me.$el.find( '.panel' ).panel( {
				contentWrap : options.el
			} );
			
			me._togglePanel.call( me );
			
		} );
		
		me.$el.find( 'h2' ).html( "百度壁纸" );
		
		me.$el.find( 'h2' ).on( 'touchmove',function( e ) {
			e.preventDefault();
		} );
  
    },
	
	_togglePanel : function( ) {
		
		this.panelUI.panel( 'toggle', 'reveal', 'left' );
	},
	
	
	onBeforePageIn : function( e ){
		var me = this;
		
		me.tag = e.params.tag || me.tag;
		
		me._repair.call( me );
		
		me.$el.show();
	},
	
	onTagChage : function( e ) {
		var me = this,
			el = $( e.target ),
			tag = el.attr( 'data-tag' );
			
		me.tag = tag;
		
		me._repair.call( me );
		
		me._togglePanel.call( me );
		
		Chassis.history.navigate( 'index/' + tag, { trigger : false } );
		
		me.root.trigger( 'tagChange', {
			tag  : tag,
			page : 1
		} );
		

	},
	
	_repair : function(){
		var me = this;

		me.$el.find( '.index_page_tag li' ).removeClass( 'select' );
		
		me.$el.find( '.index_page_tag li[data-tag=' + me.tag + ']' ).addClass( 'select' );
	}

} );

} )( Zepto );
