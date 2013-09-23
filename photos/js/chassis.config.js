Chassis.F = {
	load : require.async
};


Chassis.load.config.ruler = function( pkg ){
	var page,name;
	if( pkg.indexOf( 'pageview' ) === 0 ){
		name = pkg.substring(9);
		return [
			'page/' + name + '/js/view/pageview.' + name + '.js'
		];
	}
	
	
	if( pkg.indexOf( 'subview' ) === 0 ){
		page = pkg.substring(8);
		
		if( page.indexOf( '_' ) > 0 ){
			page = page.split( '_' )[0];
		} else {
			page = 'index';
		}
		
		pkg = 'subview.' + pkg.substring(8);
		
		return 'page/' + page + '/js/view/' + pkg + '.js';
	}

};