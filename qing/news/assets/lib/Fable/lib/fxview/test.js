// ==========================================
// Copyright 2013 Baidu, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define( 
	
	[
		'fxview/index',
		'mixin/index'
	],
	
	function(){
	
		var mixin = require( 'mixin/index' );
		
		var fxview = require( 'fxview/index' );
		
		
		var createNode = function(){
			var html = '';
				
			html = '<div style="overflow:hidden;position:absolute;width:600px;height:300px;border:1px solid #ff3200;top:50px;left:50px;bottom:0;right:0;">';
				html += '<div id="viewA" style="position:absolute;top:0;left:0;bottom:0;right:0;background:#f87650;display:none;">ViewA</div>';
				html += '<div id="viewB" style="position:absolute;top:0;left:0;bottom:0;right:0;background:#357893;display:none;">ViewB</div>';
			html += '</div>';
			$( 'body' ).append( html );
		};
		
		var removeNode = function(){
			$( '#viewA' ).parent().remove();
		};
		
		
		module('Iron.Module.fxview');
		
		asyncTest('animation simple', 0, function() {
			
			var viewA = {
					el : '#viewA'
				},
				viewB = {
					el : '#viewB'
				};
				
			
			createNode();
			window.setTimeout(function(){
				
				fxview.animation( 'simple', {
					from : viewA,
					to   : viewB,
					dir  : 0,
					end  : function(){
						window.setTimeout(function(){
							removeNode();
							start();
						},1000);
					}
				
				} );
			}, 1000);
			
		});
		
		asyncTest('animation slider', 0, function() {
			
			var viewA = {
					el : '#viewA'
				},
				viewB = {
					el : '#viewB'
				};
				
			createNode();
			
			fxview.animation( 'slider', {
				from : viewA,
				to   : viewB,
				dir  : 0,
				end  : function(){
					window.setTimeout(function(){
						removeNode();
						start();
					},1000);
				}
			
			} );
		});
		
		
		
	}
);