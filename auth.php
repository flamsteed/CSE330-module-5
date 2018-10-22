<?php
/**
 * Created by PhpStorm.
 * User: Willis
 * Date: 3/18/18
 * Time: 8:20 PM
 */
ini_set("session.cookie_httponly", 1);
session_start();
header("Content-Type: application/json");
if(empty($_SESSION)) {
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Token"
    ));
    exit;
}else{
    echo json_encode(array(
        "success" => true,
        "username" => $_SESSION["username"],
        "token" => $_SESSION["token"]
    ));
}
exit;