<?php
    $q = $_REQUEST['q'];
    echo file_get_contents("../teams/".$q.".json");
?>