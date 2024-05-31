<?php session_start() ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>TechCrunch</title>
    <link rel="stylesheet" href="/shared.css">
    <script src="shared.js" defer></script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>

<body>

    <nav class=top-bar>
        <a href="./"><img src="img/logo.png" alt="logo" class=top-bar-logo></a>
        <img src="img/menu-lines.png" alt="menu-lines" class=top-bar-logo onclick="toggle_bar()">
    </nav>

    <nav class=left-bar>
        <img src="img/menu-lines.png" alt="menu-lines" class=left-bar-logo onclick="toggle_bar()">
        <a href="./"><img src="img/logo.png" alt="logo" class=logo-item></a>

        <?php if (isset($_SESSION["admin"]) && $_SESSION["admin"] == 1) { ?>
            <a class=user-in href="generate.php">Generate</a>
        <?php } ?>

        <?php if (isset($_SESSION["user_id"])) { ?>
            <a class=user-in href="serv/remove_account.php">Delete</a>
        <?php } ?>

        <?php if (!isset($_SESSION["user_id"])) { ?>
            <a href="/login.php" class="login-item user-in">Login</a>
        <?php } ?>

        <div id=categories></div>
        <?php if (isset($_SESSION["user_id"])) { ?>
            <a class="user-in logout" href="serv/logout.php">Logout</a>
        <?php } ?>

    </nav>

    <div id=mask onclick="toggle_bar()"></div>

    <div class=content>
