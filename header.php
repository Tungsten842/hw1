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
            <a href="generate.php">Generate</a>
        <?php } ?>

        <?php if (isset($_SESSION["user_id"])) { ?>
            <a href="serv/logout.php">Logout</a>
        <?php } ?>

        <?php if (!isset($_SESSION["user_id"])) { ?>
            <div class=login-item onclick="login_popup()">Login</div>
        <?php } ?>

        <div class=bar-item> Startup</div>
        <div class=bar-item> Venture</div>
        <div class=bar-item> Security</div>
        <div class=bar-item> AI</div>
        <div class=bar-item> Crypto</div>
        <div class=bar-item> Apps</div>
        <div class=bar-item> Events</div>
        <div class=bar-item> Startup Battlefield</div>
        <div class=bar-item> More</div>
    </nav>

    <form class=login-register-form>
        <input type="text" name="name" class="username-form" placeholder="Name">
        <input type="text" name="surname" class="username-form" placeholder="Surname">
        <input type="text" name="email" class=username-form placeholder="Email">
        <input type="password" name="password" class=password-form placeholder="Password">
        <p id=login-error></p>
        <div class=login-register-button>
            <input type="button" name="register" value="Register" onclick="auth_prompt('register')">
            <input type="button" name="login" value="Login" onclick="auth_prompt('login')">
        </div>
    </form>
    <div id=mask onclick="login_popup()"></div>

    <div class=content>
