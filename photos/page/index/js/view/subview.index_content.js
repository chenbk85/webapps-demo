( function ( $ ) {
var tpl_tag     = require( 'page/index/tpl/tag.tpl' ),
	tpl_photo   = require( 'page/index/tpl/photo.tpl' ),
	tpl_piclist   = require( 'page/index/tpl/piclist.tpl' ),
	model_photo = require( 'page/index/js/model/model.photo.js' ),
	panel       = require( 'js/common/gmu/js/widget/panel.js' ),
	toolbar     = require( 'js/common/gmu/js/widget/toolbar.js' ),
	slider      = require( 'js/common/gmu/js/widget/slider.js' );
	
Chassis.SubView.index_content = Chassis.SubView.extend( {

    el : '#index_page_content',
	
	events : {
		'change model'              : 'onModelChange',
		'tap .typcn-arrow-repeat'   : 'eRefresh',
		'tap .typcn-th-list'        : 'eTag',
		'tap .picList'              : 'eView'
	},
	
    init: function ( options ) {
        var me = this;

		me.tag  = options.tag || 'pp_meinv_hd';
		me.page = 1;

		me.root.on( 'tagChange', function ( options ) {
			me.tag = options.tag;
			me.page = options.page;
			
			me._reload();
		} );

		me.model = new Chassis.Model.Photo();
    },

	render: function(sections){
        var me = this,
			data = me.model.toJSON(),
			
			height = data.pics.length * 50;
		
		app._cache = app._cache || [];
		
		if ( me.page === 1 ) {
			app._cache = [];
		}
		
		app._cache = app._cache.concat( data.pics );
		
		
		me.hideLoading();
		
		me.tagTitle = me._findTagName.call( me, me.tag );
		
		
		me.$el.html( tpl_photo.template( {title:me.tagTitle} ) );
		
		if ( me.page == 1 ) {
			me.$el.find( '.content' ).html( tpl_piclist.template( $.extend( data,{ random : 0 } ) ) );
		} else {
			me.$el.find( '.content' ).append( tpl_piclist.template( $.extend( data,{ random : 0 } ) ) );
		}
		
		me.$el.find( '.content .picList' ).height( height );
		
		
		me.$el.find( '.navbar' ).toolbar( {
			useFix : true
		} );
		
		
		me.$el.find('.content').slider( {
			autoPlay : false,
			loop     : false,
            showArr  : false,
            slideend : function( e, page ) {
                console.log( 1 );
            }
		
		} );
		
        
		
		
    },
	
	onBeforePageIn : function(){
		var me = this;
		
		if( me.complete ){
			
			return;
		}
		me._reload.call( me, {
			
			tag  : me.tag,
			page : 1
			
		} );

	},
	

	
	_reload : function( options ){
		
		var me = this;
		
		options = options || {};
		
		options = $.extend( {
			tag  : me.tag,
			page : me.page
		}, options );
		
		me.model.fetch({
			
			data : {
				tag  : options.tag,
				page : options.page
			},
			
			success : function(){
				me.complete = true;
				me.$el.show();
			}
		});
	
	},
	
	_findTagName : function( tag ){
		var tagTitle = '';
		
		for( var i = 0; i < app.tag.data.length; i++ ){
			if( app.tag.data[ i ][ 'tag' ] === tag ){
				tagTitle = app.tag.data[ i ][ 'tagname' ];
				break;
			}
		}
		
		return tagTitle;
	},
	
	onModelChange : function(){
		this.render();
	},
	
	eTag : function( e ) {
		var me = this,
			el = $( e.target );
		
		
		me.root.trigger( 'panel', {
			el : me.$el
		} );
		
	},
	
	eRefresh : function( e ) {
		var me = this;
		me._reload();
	},
	
	eView : function( e ){
		
		var me = this,
			el = $( e.target ),
			i = el.attr( 'data-i' );
			
		if( !i ){
			return;
		}
		
		
		
		Chassis.history.navigate( 'detail/' + me.tag + '/' + i );
	}

} );

} )( Zepto );
