<?php
session_start();
if (!isset($_SESSION["user_id"])) {
    exit("You need to be logged to comment.");
}
// Create connection
$conn = mysqli_connect("localhost", "website", "", "website");
// Check connection
if (!$conn) {
    exit("Connection failed: " . mysqli_connect_error());
}
// post variable for getting id
$article_id = mysqli_real_escape_string($conn, $_POST["id"]);
$user_id = mysqli_real_escape_string($conn, $_SESSION["user_id"]);
$text = mysqli_real_escape_string($conn, $_POST["text"]);

$query = "INSERT INTO Comments (article_id, user_id, text) VALUES
 ('$article_id','$user_id','$text')";
mysqli_query($conn, $query);

exit();
