<?php require("header.php"); ?>
<link rel="stylesheet" href="/login.css">
<script src="/login.js" defer></script>

<div class="container">
    <input type="checkbox" id="check">
    <div class="login form">
        <header>Login</header>
        <form id=form-login>
            <div id=login-error> </div>
            <input name=email type="text" placeholder="Enter your email">
            <input name=password type="password" placeholder="Enter your password">
            <input type="button" class="button" value="Login" id=login-button>
        </form>
        <div class="signup">
            <span class="signup">Don't have an account?
                <label for="check">Signup</label>
            </span>
        </div>
    </div>
    <div class="registration form">
        <header>Signup</header>
        <form id=form-register>
            <div id=register-error> </div>
            <input name=name type="text" placeholder="Enter your name">
            <input name=surname type="text" placeholder="Enter your surname">
            <input name=email type="text" placeholder="Enter your email">
            <input name=password type="password" placeholder="Create a password">
            <input type="button" class="button" value="Signup" id=register-button>
        </form>
        <div class="signup">
            <span class="signup">Already have an account?
                <label for="check">Login</label>
            </span>
        </div>
    </div>
</div>
<?php require("footer.html"); ?>
