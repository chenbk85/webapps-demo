<?php
    // 使loading效果显著一些
    sleep( 2 );
	$category = $_GET[ 'id' ];
	
	$ts = $_GET[ 'ts' ];

	if ( $ts ) {
		$url = "http://m.baidu.com/news?tn=bdapirecommend&soe=1&category=$category&ln=200&an=20&nids=1&ts=" . $ts;
	} else {
		$url = "http://m.baidu.com/news?tn=bdapilist&soe=1&category=$category&ln=200&an=20";
	}
    
	
    echo file_get_contents($url);
?>