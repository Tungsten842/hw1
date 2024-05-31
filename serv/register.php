<?php

if (!isset($_POST['name']) || $_POST['name'] === "") {
    exit("Your must insert a name.");
}
if (!isset($_POST['surname']) || $_POST['surname'] === "") {
    exit("Your must insert a surname.");
}
if (!isset($_POST['email']) || $_POST['email'] === "") {
    exit("Your must insert an email.");
}
if (!isset($_POST['password']) || $_POST['password'] === "") {
    exit("Your must insert a password.");
}
if (strlen($_POST['name']) >= 30) {
    exit("Your name must be shorter that 30 characters.");
}
if (strlen($_POST['surname']) >= 30) {
    exit("Your surname must be shorter that 30 characters.");
}
if (strlen($_POST['email']) >= 30) {
    exit("Your email must be shorter that 30 characters.");
}

if (!preg_match("/^[a-zA-Z-' ]*$/", $_POST['name'])) {
    exit("You must insert a valid name.");
}
if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    exit("You must insert a valid email.");
}

// Create connection
$conn = mysqli_connect("localhost", "website", "", "website");
// Check connection
if (!$conn) {
    exit("Connection failed: " . mysqli_connect_error());
}

$email = mysqli_real_escape_string($conn, $_POST['email']);
$query = "SELECT * FROM Users WHERE email = '$email'";

$result = mysqli_query($conn, $query);
$rowcount = mysqli_num_rows($result);

if ($rowcount === 0) {
    //verify password
    if (strlen($_POST['password']) < 9) {
        exit("Your password must be longer than 9 chacters");
    }
    if (!preg_match('/[0-9]/', $_POST['password'])) {
        exit("Your password must contain numbers");
    }
    if (!preg_match('/[A-Z]/', $_POST['password'])) {
        exit("Your password must contain an uppercase letter");
    }

    $na = mysqli_real_escape_string($conn, $_POST['name']);
    $su = mysqli_real_escape_string($conn, $_POST['surname']);
    $em = mysqli_real_escape_string($conn, $_POST['email']);
    $pa = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $query = "INSERT INTO Users (name, surname, email, password, admin)
       VALUES ('$na','$su','$em','$pa', 0)";
    $result = mysqli_query($conn, $query);
    exit("Your account has been created.");
} else {
    exit("This email is already used.");
}
