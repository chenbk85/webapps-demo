<?php
    $url = "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&format=json&type=1&size=20&offset=0";
    echo file_get_contents($url);
?>