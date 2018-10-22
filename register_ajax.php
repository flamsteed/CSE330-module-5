<?php

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

$username = $_POST["username"];
$password = $_POST["password"];
require 'database.php';
$options = array ("cost"=>4);
$hashPass = password_hash($password, PASSWORD_BCRYPT,$options);
$stmt = $mysqli->prepare("INSERT INTO users (user_name, user_password) VALUES (?, ?)");
If(!$stmt) {
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Username or Password"
    ));
    exit;
}
$stmt->bind_param('ss',$username,$hashPass);
$stmt->execute();
$stmt->close();
$psw = $_POST["password"];
    session_start();
    $_SESSION["username"] = $username;
    $_SESSION["token"] = substr(md5(rand()), 0, 10);
    echo json_encode(array(
        "success" => true,
        "token" => $_SESSION["token"]
    ));
    exit;
?>