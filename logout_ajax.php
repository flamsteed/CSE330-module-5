<?php
	session_start();
	$username = $_SESSION['username'];
	session_destroy();
	echo json_encode(array(
        "success" => true
    ));
    exit;
?>
