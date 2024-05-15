<?php
session_start();

//$name = $_POST['name'];

// Set session variables
//$_SESSION["error"] = "green";

if ($_POST['email'] === "") {
    exit("Your must insert an email.");
}
if ($_POST['password'] === "") {
    exit("Your must insert a password.");
}

// Create connection
$conn = mysqli_connect("localhost", "website", "", "website");
// Check connection
if (!$conn) {
    exit("Connection failed: " . mysqli_connect_error());
}

$email = mysqli_real_escape_string($conn, $_POST['email']);
$query = "SELECT email,password,admin FROM Users WHERE email = '$email'";
$result = mysqli_query($conn, $query);
$row = mysqli_fetch_row($result);
$rowcount = mysqli_num_rows($result);

if ($rowcount === 0) {
    exit("This email is not registered.");
} else {
    if (password_verify($_POST['password'], $row[1])) {
        $_SESSION["email"] = $email;
        # if admin
        if ($row[2] === 1) {
            $_SESSION["admin"] = 1;
        }

        exit("You have been logged in successfully");
    } else {
        exit("The password is incorrect");
    }
}
