<?php
    $img = $_REQUEST["img"];

    $span = $_REQUEST["span"];

    $i = $_REQUEST["i"];

    $nums = $_REQUEST["nums"];

    $zhanghao = $_REQUEST["zhanghao"];

    $filePath = "./shopp.json";

    $content = fread(fopen($filePath,"r"),filesize($filePath));

    $data = json_decode($content,true);

    $data[] = array("zhanghao"=>$zhanghao,"img"=>$img,"span"=>$span,"i"=>$i,"nums"=>$nums);

    fwrite(fopen($filePath,"w"),json_encode($data,true));

    fclose($filePath);
?>