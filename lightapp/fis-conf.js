fis.config.merge({
    chassis : {
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
			//非按需加载不要处理tpl文件
			tpl    : ''
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
                release : '/$&'
            },
						
			{
                reg : '**\.css',
                release : '/$&'
            },
			{
                reg : 'js/**\.js',
				
                release : '/$&'
            },
			{
                
                reg : 'page/**\.js',
                
               
                
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
            '/js/common/baidutemplate/baidutemplate.js',
			'/js/common/gmu/js/zepto.js',
            '/js/common/gmu/js/zepto.extend.js',
			'/js/common/chassis/chassis.js',
			'/js/init.js',
			'/page/**.js',
			'/globalview/**.js'
        ]
	
	}
	
	
});
