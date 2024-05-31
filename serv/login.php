<?php
session_start();

if (!isset($_POST['email']) || $_POST['email'] === "") {
    exit("Your must insert an email.");
}
if (!isset($_POST['password']) || $_POST['password'] === "") {
    exit("Your must insert a password.");
}

// Create connection
$conn = mysqli_connect("localhost", "website", "", "website");
// Check connection
if (!$conn) {
    exit("Connection failed: " . mysqli_connect_error());
}

$email = mysqli_real_escape_string($conn, $_POST['email']);
$query = "SELECT id,name,email,password,admin FROM Users WHERE email = '$email'";
$result = mysqli_query($conn, $query);
$rowcount = mysqli_num_rows($result);
$user_info = mysqli_fetch_assoc($result);

if ($rowcount === 0) {
    exit("This email is not registered.");
} else {
    if (password_verify($_POST['password'], $user_info["password"])) {
        $_SESSION["user_id"] = (int)$user_info["id"];
        $_SESSION["name"] = $user_info["name"];

        # if admin
        if (strcmp($user_info["admin"], 1) === 0) {
            $_SESSION["admin"] = (int)1;
        }
        exit("You have been logged in successfully.");
    } else {
        exit("The password is incorrect.");
    }
}
