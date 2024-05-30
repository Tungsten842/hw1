<?php
session_start();
if (!isset($_SESSION["user_id"])) {
    exit("You need to be logged to remove comments.");
}

// Create connection
$conn = mysqli_connect("localhost", "website", "", "website");
// Check connection
if (!$conn) {
    exit("Connection failed: " . mysqli_connect_error());
}
// post variable for getting id
$user_id = mysqli_real_escape_string($conn, $_SESSION["user_id"]);
$comment_id = mysqli_real_escape_string($conn, $_POST["id"]);

$query = "DELETE FROM Comments WHERE Comments.user_id = $user_id AND Comments.id = $comment_id";

if (isset($_SESSION["admin"]) && $_SESSION["admin"] == 1) {
    $query = "DELETE FROM Comments WHERE Comments.id = $comment_id";
}

mysqli_query($conn, $query);
