<?
session_start();
if (!isset($_SESSION["admin"]) || $_SESSION["admin"] !== 1) {
    exit("Access denied");
}
session_write_close();
require("header.php");
?>
<script src="/generate.js" defer></script>

<form class=form-generate>
    <label for="fname">Prompt:</label><br>
    <input type="text" name="prompt" id="prompt_text"><br>
    <input type="submit" value="Generate">
    <button onclick="submit_article()">SUBMIT</button>
</form>

<div>
    <h2 id=title-result></h2>
    <div id=text-result></div>
    <div id=author-result></div>
    <img src="" alt="" id=image-result>
    <div id=comment-result></div>
    <div id=category-result></div>
</div>

<?php require("footer.html"); ?>
