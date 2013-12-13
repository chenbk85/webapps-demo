fis.config.merge({
    chassis : {
		home   : 'index.html',
		router : {
			"routes" : {
				""                : "index",
				"index"           : "index",
				"index/:id"       : "index",
				"detail/:id/:cid" : "detail",
				"app"             : "app"
			},
			
			"defaultPageTransition" : "simple",
			
			"enablePositionRestore" : true,
			
			"pageTransition" : {
				"index-detail" : "slide",
				"index-app"    : "slide"
			}
		}
	}
});