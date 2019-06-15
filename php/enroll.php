<?php
    $phone = $_REQUEST["phone"];

    $password = $_REQUEST["password"];

    $filePath = "./enroll.json";

    $content = fread(fopen($filePath,"r"),filesize($filePath));

    $data = json_decode($content,true);

    for($i = 0; $i < count($data); $i++){
        if($phone == $data[$i]["phone"]){
            echo 123;
            return;
        }else if($i == count($data) -1 && $phone != $data[$i]["phone"]){
            $data[] = array("phone"=>$phone,"password"=>$password);
            echo 321;
            fwrite(fopen($filePath,"w"),json_encode($data,true));
            return;
        }
    }
    fclose($filePath);
?>              