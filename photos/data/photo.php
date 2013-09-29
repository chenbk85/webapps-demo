<?php
	define("PHOTO_SOURCE",     "androidesk");
	define("PHOTO_LIMIT",      24);

	require_once( "photo/". PHOTO_SOURCE ."/photo.php" );

	$tag  = isset( $_GET[ 'tag' ] )  ? trim( $_GET[ 'tag' ] )  : '';
	$page = isset( $_GET[ 'page' ] ) ? (int)( $_GET[ 'page' ] ) : 1;

	if ( $tag == '' ) {
		$tag = 'wp_retina_plant_auditor';
	}


	$photo = new PhotoThird();

	$photolist = $photo->getPhotoList(
		array(
		
			"tag"   => $tag,
			"limit" => PHOTO_LIMIT,
			"page"  => $page
			
		)
	);

	$result = array(
		"pics" => $photolist
	);
	echo json_encode( $result );
?>