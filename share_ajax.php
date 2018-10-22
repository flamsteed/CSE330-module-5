<?php
/**
 * Created by PhpStorm.
 * User: Willis
 * Date: 3/18/18
 * Time: 2:50 PM
 */
ini_set("session.cookie_httponly", 1);
session_start();
header("Content-Type: application/json");
require 'database.php';
if(empty($_SESSION["username"])){
    exit;
}else{
    $username = $_SESSION["username"];
}
if(empty($_POST["token"])){
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Token"
    ));
    exit;
}else{
    $token = $_POST["token"];
}
if ($token!=$_SESSION["token"]){
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Token"
    ));
    exit;
}
$id = $_POST["id"];
$shareTo = $_POST["to"];
$stmt = $mysqli->prepare("select user_name,year, month, day, time, event, tag from events where event_id = ?");
if(!$stmt){
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Username"
    ));
    exit;
}
$stmt->bind_param('s',$id);
$stmt->execute();
$stmt->bind_result($user_name,$year, $month, $day, $time, $name, $tag);
$stmt->fetch();
$stmt->close();
if ($username!=$user_name){
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect user"
    ));
    exit;
}
$stmt2 = $mysqli->prepare("insert into events (event_id, year, month, day, time, event, user_name, tag) VALUES (NULL , ?, ?, ?,?, ?, ?, ? )");
if(!$stmt2){
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Username"
    ));
    exit;
}
$stmt2->bind_param('iiissss',$year, $month, $day, $time, $name, $shareTo, $tag);
$stmt2->execute();
$stmt2->close();
echo json_encode(array(
    "success" => true
));
exit;