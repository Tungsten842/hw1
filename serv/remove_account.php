<?php
session_start();
if (!isset($_SESSION["user_id"])) {
    exit("You need to be logged to remove your account.");
}

// Create connection
$conn = mysqli_connect("localhost", "website", "", "website");
// Check connection
if (!$conn) {
    exit("Connection failed: " . mysqli_connect_error());
}

$id = mysqli_real_escape_string($conn, $_SESSION["user_id"]);

$query = "DELETE FROM Users WHERE Users.id = $id";
mysqli_query($conn, $query);
session_destroy();

header("Location: ../index.php");
