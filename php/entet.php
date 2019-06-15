<?php
    $phone = $_REQUEST["phone"];

    $password = $_REQUEST["password"];

    $filePath = "./enroll.json";

    $content = fread(fopen($filePath,"r"),filesize($filePath));

    $data = json_decode($content,true);

    for($i = 0; $i < count($data); $i++){
        if($phone == $data[$i]["phone"]){
            $s = $i;
            if($password == $data[$s]["password"]){
                echo "123";
                return;
            }else{
                echo "1234";
            }           
            return;
        }else if($i == count($data) -1 && $phone != $data[$i]["phone"]){
            echo 321;
            return;
        }
    }
    fclose($filePath);
?>