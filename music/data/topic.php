<?php
    $url = "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.diy.getOfficialDiyList&format=json&rn=20&from=mixapp&offset=0";
    echo file_get_contents($url);
?>