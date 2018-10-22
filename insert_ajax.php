<?php
/**
 * Created by PhpStorm.
 * User: Willis
 * Date: 3/17/18
 * Time: 5:54 PM
 */
ini_set("session.cookie_httponly", 1);
session_start();
require 'database.php';
$username = $_SESSION["username"];
if(!empty($_POST)) {
    $token = $_POST["token"];
    $events = $_POST["events"];
    $year = $_POST["year"];
    $month = $_POST["month"];
    $day = $_POST["day"];
    $time = $_POST["time"];
    $tag = $_POST["tag"];
	//echo($tag);
}else{
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Token"
    ));
    exit;
}
if ($token!=$_SESSION["token"]){
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Token"
    ));
    exit;
}
$stmt = $mysqli->prepare("insert into events (event_id, year, month, day, time, event, user_name,tag, public) VALUES (NULL , ?, ?, ?, ?, ?, ?, ?, NULL )");
if(!$stmt){
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Username"
    ));
    exit;
}
$stmt->bind_param('sssssss',$year, $month, $day, $time, $events, $username, $tag);
$stmt->execute();
$stmt->close();
echo json_encode(array(
    "success" => true
));
exit;