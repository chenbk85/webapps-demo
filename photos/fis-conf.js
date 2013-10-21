fis.config.merge({
    chassis : {
		home   : 'index.html',
		main   : {
			"iphone" : {
				"standalone" : "cover",
				"other"      : "cover" //"install"
			},
			"other"  : "iphone"
		},
		
		router : {
			"routes" : {
				""                  : "index",
				"index/:tag"        : "index",
				"detail/:tag/:i"    : "detail",
				"cover"             : "cover",
				"install"           : "install",
				"iphone"            : "iphone"
			},
			
			"defaultPageTransition" : "simple",
			
			"enablePositionRestore" : false,
			
			"pageTransition" : {
				"index-detail" : "slide",
				"cover-index"  : "slider"
			}
		}
	}
});