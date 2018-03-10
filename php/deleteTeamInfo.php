<?php
    $q = $_REQUEST['q'];
    if ($q == 0)
        return;
	if (preg_match("/\.\//", $q))
        return;
    unlink("../teams/".$q.".json");
?>