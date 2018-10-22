<?php
// login_ajax.php

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
ini_set("session.cookie_httponly", 1);
session_start();
$username = $_POST["username"];
$password = $_POST["password"];
require 'database.php';
// Check to see if the username and password are valid.  (You learned how to do this in Module 3.)
$stmt = $mysqli->prepare("SELECT user_password FROM users WHERE user_name=?");
If(!$stmt) {
    printf("<h1>Query Prep Failed:%s</h1>\n", $mysqli->error);
    echo "<h2>Wrong Username, Please try again.</h2>";
    echo "<a href='/news/login.php'>Login</a>";
    exit;
}
$stmt->bind_param('s',$username);
$stmt->execute();
$stmt->bind_result($hashedpswd);
$stmt->fetch();
if(password_verify($password,$hashedpswd) /* valid username and password */ ){
    $_SESSION["username"] = $username;
    $_SESSION["token"] = substr(md5(rand()), 0, 10);

    echo json_encode(array(
        "success" => true,
        "token" => $_SESSION["token"]
    ));
    exit;
}else{
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Username or Password"
    ));
    //echo $password;
    //echo $hashedpswd;
    exit;
}
?>