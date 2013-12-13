// ==========================================
// Copyright 2013 Baidu, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define(  
	[
		'base/index',
		'mixin/index'
	],
	
	function( base, mixin ) {
		
			
		return {
			
				slider : function( options ) {

					var fromEl = options.from.el, 
						toEl   = options.to.el, 
						dir    = options.dir, //0表示TO移到左边再开始往右滑动，1表示TO移到右边再往左滑动
						w;

					

					// 准备位置
					toEl = $( toEl );
					fromEl = $( fromEl );

					fromEl.css({
						'display': 'inline-table'
					});

					toEl.css({
						'display': 'inline-table'
					});

					
					w = fromEl.width();
					transitionEnd = function(){
						
						fromEl.hide();
						fromEl.css('-webkit-animation','');
						toEl.css('-webkit-animation','');
						(options.end || function(){})();
					};
					
					//写入css
					var css = "@-webkit-keyframes to {0%{margin-left:0px;} 100%{margin-left:-"+ w +"px;} }@-webkit-keyframes from {0%{margin-left:-"+w+"px;} 100%{margin-left:0px;} }";
					if( $( '#_slider_97803' ).length ){
						$( '#_slider_97803' ).text(  css );
					} else {
						$( 'head' ).append( "<style id='_slider_97803'>" + css + "</style>" );
					}
					
					if ( dir === 1 ) {
						
						toEl.css( 'margin-left',0 );
						fromEl.css( '-webkit-animation','to 0.35s 0s 1 ease normal forwards' );
						
					} else {
						fromEl.css( 'margin-left',0 );
						toEl.css( '-webkit-animation','from 0.35s 0s 1 ease normal forwards' );
						
					}
					
					setTimeout(function() {
						transitionEnd();
					}, 350);

				}
		};
		
	}
);