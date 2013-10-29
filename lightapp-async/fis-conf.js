fis.config.merge({
    chassis : {
		home   : 'index.html',
		router : {
			"routes" : {
				""       : "index",
				"detail" : "detail"
			},
			
			"defaultPageTransition" : "simple",
			
			"enablePositionRestore" : true,
			
			"pageTransition" : {
				"index-detail" : "slide"
			}
		}
	},
	pack : {
		'pkg/init.js' : [
            '/js/common/gmu/js/zepto.js',
            '/js/common/gmu/js/zepto.extend.js',
			'/js/common/chassis/chassis.js',
			'/js/common/mod.js'
        ]
	
	}
	
	
});
