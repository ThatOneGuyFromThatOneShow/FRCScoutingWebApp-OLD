<?php
    $q = $_REQUEST['q'];
    $data = $_POST['data'];
    $file = fopen("../teams/".$q.".json", "w");
    fwrite($file, $data);
    fclose($file);
?>