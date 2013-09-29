fis.config.merge({
    chassis : {
		home   : 'index.html',
		router : {
			"routes" : {
				""                  : "index",
				"index/:tag"        : "index",
				"detail/:tag/:i"    : "detail",
				"cover"             : "cover",
				"install"           : "install"
			},
			
			"defaultPageTransition" : "simple",
			
			"enablePositionRestore" : true,
			
			"pageTransition" : {
				"index-detail" : "slide",
				"cover-index"  : "slider"
			}
		}
	}
});