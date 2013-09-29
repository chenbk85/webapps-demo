<?php

Class PhotoThird {

	public function getPhotoList( $params ) {
	
		$content = explode("\n",file_get_contents( $params[ 'tag' ] . '.txt'));
	
		$content = array_slice( $content, ($params[ 'page' ]-1) * $params[ 'limit' ], $params[ 'limit' ] );
		
		$result = array();
		
		foreach( $content as $key=>$value ){
			$result[] = array(
				"stand" => array(
					"url" => str_replace( "/middle/", "/big/", $value )
				),
				"thumb" => array(
					"url" => $value
				)
			);
		}
		
		return $result;
	
	}

}
?>