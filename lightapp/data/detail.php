<?php
    // 使loading效果显著一些
    sleep( 2 );
    $id = $_GET['id'];
    $url = "http://m.baidu.com/news?tn=bdapibody&type=0&nids=$id&category=4";
    echo file_get_contents($url);
?>