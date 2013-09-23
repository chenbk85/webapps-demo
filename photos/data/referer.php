<?php

//PHP(前提是装了curl):
/*
$ch = curl_init();
curl_setopt ($ch, CURLOPT_URL, "http://lh6.ggpht.com/-VDFekRRavZA/UGqobM1XSeI/AAAAAAAACK8/UgtNnDPxphU/s320/362.jpg");
curl_setopt ($ch, CURLOPT_REFERER, "");
curl_exec ($ch);
curl_close ($ch);
*/

//PHP(不装curl用sock)
$url = $_GET[ 'url' ];

$grp = split( "/",$url );


$ext = substr(strrchr($url, '.'), 1) ;


header("Content-type: image/".$ext);
$server = $grp[2];
$host      = $grp[2];
$target    = '/' . implode("/",array_slice( $grp, 3));
$referer = $grp[2];      // Referer
$port      = 80;


$fp = fsockopen($server, $port, $errno, $errstr, 30);
$i = 0;


if (!$fp) 
{
     echo "$errstr ($errno)<br />\n";
} 
else 
{
          $out = "GET $target HTTP/1.1\r\n";
          $out .= "Host: $host\r\n";
          $out .= "Referer: $referer\r\n";
          $out .= "Connection: Close\r\n\r\n";
		  $result = '';
		  
		  
          fwrite($fp, $out);
          while (!feof($fp)) 
          {
			$i++;
			
			$res = fgets($fp);
			
			if( $i >= 17 ){
				
				$result .= $res;
				echo $res;
			}
			
            
          }
          fclose($fp);
		  
		  
		  
}

?>