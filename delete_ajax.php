<?php
/**
 * Created by PhpStorm.
 * User: Willis
 * Date: 3/17/18
 * Time: 7:23 PM
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
$event_id = $_POST["event_id"];
$stmt = $mysqli->prepare("select user_name from events where event_id=?");
if(!$stmt){
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Username"
    ));
    exit;
}
$stmt->bind_param('s', $event_id);
$stmt->execute();
$stmt->bind_result($user);
$stmt->fetch();
$stmt->close();
if($user!=$username){
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Username"
    ));
    exit;
}
$stmt = $mysqli->prepare("delete from events where event_id = ?");
if(!$stmt){
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Username"
    ));
    exit;
}
$stmt->bind_param('s', $event_id);
$stmt->execute();

$stmt->close();
echo json_encode(array(
    "success" => true
));
exit;