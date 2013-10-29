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
	
	modules : {
		parser : {
			tpl    : '',
			md     : 'marked'
        }
	},
	roadmap : {
		path : [
            {
                reg : 'map.json',
                release : 'map.json'
            },
			{
                reg : '**\.html',
				isMod : true,
                release : '/$&'
            },
						
			{
                reg : '**\.css',
                isMod : true,
                release : '/$&'
            },
            {
                reg : 'router.json',
                release : false
            },
			
			{
                reg : 'js/common/mod.js',
                
                isMod : false,
                
                release : '/js/common/mod.js'
            },
			{
                
                reg : 'js/common/gmu/js/zepto.js',
                
                isMod : false,
                
                release : '/js/common/gmu/js/zepto.js'
            },
			{
                
                reg : 'js/common/gmu/js/zepto.extend.js',
                
                isMod : false,
                
                release : '/js/common/gmu/js/zepto.extend.js'
            },
			{
                
                reg : 'js/common/chassis/chassis.js',
                
                isMod : false,
                
                release : '/js/common/chassis/chassis.js'
            },
			{
                
                reg : 'js/rocket-chassis-bridge.js',
                
                isMod : false,
                
                release : '/js/rocket-chassis-bridge.js'
            },
			{
                reg : 'js/**\.js',
				isMod : false,
                release : '/$&'
            },
			{
                
                reg : 'page/**\.js',
                
                isMod : false,
                
                release : '/$&'
            },
			{
                
                reg : 'page/**\.tpl',
                
                isMod : false,
                
                release : '/$&'
            }
		],
	},
	
	
	pack : {
		'pkg/all.js' : [
			'/js/common/mod.js',
            '/js/common/baidutemplate/baidutemplate.js',
			'/js/common/gmu/js/zepto.js',
            '/js/common/gmu/js/zepto.extend.js',
			'/js/common/chassis/chassis.js',
			'/js/chassis.config.js',
			'/js/init.js',
			'/page/**.js'
        ]
	
	}
	
	
});
