fis.config.merge({
    chassis : {
		home   : 'index.html',
		router : {
			"routes" : {
				""                  : "index",
				"index/:tag"        : "index",
				"detail/:tag/:i"    : "detail"
			},
			
			"defaultPageTransition" : "simple",
			
			"enablePositionRestore" : true,
			
			"pageTransition" : {
				"index-detail" : "slide"
			}
		}
	}
});