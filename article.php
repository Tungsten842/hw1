<?php require("header.html"); ?>
<script src="article.js" defer></script>
<link rel="stylesheet" href="article.css">

<form id=a_comments>

<form class=comment-form>
    <input type="text" name="text" id="comment-text" placeholder="Comment">
    <p id=comment-error></p>
    <input type="button" name="Post" value="Post" onclick="commment_prompt()">
</form>


<?php require("footer.html"); ?>
