<?php
    $files = glob("../teams/*.json");
    natsort($files);
    foreach($files as $file) {
        echo file_get_contents($file)."<br/>";
    }
    //echo file_get_contents("../teams/".$q.".json");
?>