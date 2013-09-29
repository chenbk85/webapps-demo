<?php

Class PhotoThird {

	var $cate = array(
		"pp_meinv_hd"        => "4e4d610cdf714d2966000000", //美女
		"pp_celebrity_cn_hd" => "5109e05248d5b9368bb559dc", //明星
		"pp_landscape_hd"    => "4e4d610cdf714d2966000002", //风景
		"pp_anime_hd"        => "4e4d610cdf714d2966000003", //动漫
		"pp_sports_hd"       => "4ef0a34e0569795757000001", //运动
		"pp_love_hd"         => "4ef0a35c0569795756000000", //爱情
		"pp_animal_hd_cn"    => "4e4d610cdf714d2966000001", //动物
		"pp_creative_hd"     => "4fb47a195ba1c60ca5000222", //创意
		"pp_painting_hd"     => "4ef0a3330569795757000000",  //艺术
		"pp_plant_hd"        => "", //植物
		"pp_colorful_hd"     => "", //炫彩
		"pp_crayon_hd"       => "", //卡通
		"pp_car_hd"          => "", //名车
		"pp_military_hd"     => "", //军事
	);
	
	
	public function getPhotoList( $params ) {
		//读远端数据
		$pics = array();
		
		$url = "http://service.androidesk.com/iphone/img/cate?cid=" .$this->cate[ $params[ 'tag' ] ]. "&adult=true&skip=". ($params[ 'limit' ] * ($params[ 'page' ] -1)) ."&limit=". $params[ 'limit' ] ."&order=date";
		
		$json = file_get_contents( $url );
		
		$json = json_decode( $json );
		
		foreach( $json->resp->images as $key=>$value){
			$pics[] = array(
				"thumb" => array(
					"url" => "http://static.androidesk.com/download/".$value->vfobjs->_640x960
				),
				"stand" => array(
					"url" => "http://static.androidesk.com/download/".$value->vfobjs->_640x960
				)
			);
		}
		
		return $pics;
	
	}

}
?>