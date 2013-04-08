<?php
    $size = isset( $_GET['size'] ) ?  $_GET['size'] : 20;
    $url = "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&format=json&type=2&size=$size&offset=0";
    echo file_get_contents($url);
?>