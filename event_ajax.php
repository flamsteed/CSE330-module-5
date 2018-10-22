<?php
header("Content-Type: application/json");
require 'database.php';
ini_set("session.cookie_httponly", 1);
session_start();
if(empty($_SESSION["username"])){
    exit;
}
$username = $_SESSION["username"];
if(!empty($_POST)) {
    $token = $_POST['token'];
    $year = $_POST['year'];
    $month = $_POST['month'];
}else{
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Request"
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

$stmt = $mysqli->prepare("select event_id, day, time, event, tag from events where user_name = ? OR public = '1' AND year = ? AND month = ?");
if(!$stmt){
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Username"
    ));
    exit;
}
$stmt->bind_param('sss',$username, $year, $month);
$stmt->execute();

$stmt->bind_result($event_id, $event_day, $event_time, $event_name, $tag);
$result = array();
while($stmt->fetch()){
    $event_id = htmlentities($event_id);
    $event_date = htmlentities($event_day);
    $event_time = htmlentities($event_time);
    $event_name = htmlentities($event_name);
    $tag = htmlentities($tag);
    $object =array( "id" => $event_id,
        "day" => $event_day,
    "time" => $event_time,
   "name" => $event_name,
        "tag" => $tag
        );
    array_push($result,$object);
}
$json = json_encode($result);
echo $json;