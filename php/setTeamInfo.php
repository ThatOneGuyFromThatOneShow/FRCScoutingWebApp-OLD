<?php
    $q = $_REQUEST['q'];
    $data = $_POST['data'];
    if ($q == 0)
        return;
    $file = fopen("../teams/".$q.".json", "w");
    fwrite($file, $data);
    fclose($file);
?>