<?php
session_start();
if (!isset($_SESSION["user_id"])) {
    exit("You need to be logged to remove your account.");
}
if (!isset($_SESSION["admin"]) || $_SESSION["admin"] !== 1) {
    exit("You must be an Administrator to remove articles");
}
if (!isset($_GET["id"])) {
    exit("The article id is missing");
}

// Create connection
$conn = mysqli_connect("localhost", "website", "", "website");
// Check connection
if (!$conn) {
    exit("Connection failed: " . mysqli_connect_error());
}

$id = mysqli_real_escape_string($conn, $_GET["id"]);

$query = "DELETE FROM Articles WHERE Articles.id = $id";
mysqli_query($conn, $query);

header("Location: ../index.php");
