// ==========================================
// Copyright 2013 Baidu, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define(  
	[
		'base/index',
		'mixin/index',
		'fxview/slider'
	],
	
	function( base, mixin, slider ){
		var fxview = {
		
			animation : function( type, options ) {
				!( 
					this[ type ] &&
						options.from
				)&&
					( type = 'simple' );

				return this[ type ].call( this, options );
			},
			
			simple : function( options ) {
				options.from && $( options.from.el ).hide();
				options.to && $( options.to.el ).show();
				(options.end || function(){})();
			}
		};
		
		mixin( 
			fxview, 
			slider
		);
		
		return fxview;
	}
);