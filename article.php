<?php
require("header.php");
?>
<script src="article.js" defer></script>
<link rel="stylesheet" href="article.css">

<div id=a_post></div>
<div id=a_comments></div>

<?php if (isset($_SESSION["user_id"])) {; ?>
<form class=comment-form>
    <input type="text" name="text" id="comment-text" placeholder="Comment">
    <p id=comment-error></p>
    <input type="button" name="Post" value="Post" onclick="commment_prompt()">
</form>
<?php } ?>

<?php require("footer.html"); ?>
