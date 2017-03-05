<?php
    $files = glob("../teams/*.json");
    natsort($files);
    echo "[";
    $firstPass = true;
    foreach($files as $file) {
        if ($firstPass)
            $firstPass = false;
        else
            echo ",";
        echo file_get_contents($file);
    }
    echo "]";
    //echo file_get_contents("../teams/".$q.".json");
?>