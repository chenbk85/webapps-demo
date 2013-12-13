// ==========================================
// Copyright 2013 Baidu, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define( 
	
	[
		'base/index'
	],
	
	
	function( base ) {
		return {
			/**
			 *
			 */
			_startListening : function() {
				var me = this;
				
				me._start = true;
				
				// 开始监听hashchange
				if ( ('onhashchange' in window) &&
						((typeof document.documentMode === 'undefined') ||
						document.documentMode === 8) ) {
						
					me.curFragment = me._getFragment();
					
					$( window ).on( 'hashchange', function( e ) {
						if ( me.curFragment === me._getFragment() ) {
							return;
						}
						
						me.curFragment = me._getFragment();
						me._loadUrl.call( me, me.curFragment );
					} );
					
					// 处理当前hash
					( me.options.trigger !== false ) &&
						me._loadUrl.call( me, me._getFragment() );
					
					
					return me;
				}
				
				return me;
				
			},
			
			/**
			 *
			 */
			_stopListening : function() {
				var me = this;
				$( window ).off( 'hashchange' );
				me._start = false;
			},
			
			_getFragment : function( fragment ) {
				var match;

				if ( fragment === undefined ) {
					match = location.href.match( /#(.*)$/ );
				 
					return match ? match[ 1 ] : '';
				}
				else {
					return fragment.replace( /^[#\/]|\s+$/g, '' );
				}
			},
			
			_setFragments : function( fragments ) {
				var me = this;
				
				me.curFragment = fragments;
				
				location.hash = '#' + fragments;
				
				return me;
			}
		};
} );