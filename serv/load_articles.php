<?php
require 'token.php';
// read body
$input = file_get_contents('php://input');
$jin = json_decode($input);

// Create connection
$conn = mysqli_connect("localhost", "website", "", "website");
// Check connection
if (!$conn) {
    exit("Connection failed: " . mysqli_connect_error());
}


$now = date('Y-m-d H:i:s');

$a = mysqli_real_escape_string($conn, $jin[0]);
$b = mysqli_real_escape_string($conn, $jin[1]);
$c = mysqli_real_escape_string($conn, $jin[2]);
//$email = mysqli_real_escape_string($conn, $_POST['email']);
//$email = mysqli_real_escape_string($conn, $_POST['email']);


$query = "INSERT INTO Articles (title, text, image, date) VALUES
('$a','$b','/prova','$now')";
print($query);

$result = mysqli_query($conn, $query);

exit($result);
$row = mysqli_fetch_row($result);
$rowcount = mysqli_num_rows($result);
