<?php
    $q = $_REQUEST['q'];
    if (preg_match("/\.\//", $q))
        return;
    echo file_get_contents("../teams/".$q.".json");
?>