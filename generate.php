<?
session_start();
if (!isset($_SESSION["admin"]) || $_SESSION["admin"] !== 1) {
    exit("Access denied");
}
session_write_close();
require("header.php");
?>
<link rel="stylesheet" href="/generate.css">
<script src="/generate.js" defer></script>
<div id=t-divider>
    <div id=form-generate>

        <label for="fname">Prompt:</label><br>
        <textarea name="comment" form="comment-form" placeholder="Insert the prompt" id="prompt-text"></textarea>
        <div id=buttons-generate>
            <button id=but-gen onclick="generate_apis()">Generate</button>
            <button id=but-sub onclick="submit_article()">Submit</button>
        </div>
    </div>
    <div class="loader"></div>
</div>

<article>
    <div class=article-title></div>
    <div class=article-categories></div>
    <div class=article-divider>
        <div class=article-text></div>
    </div>
    <div class=article-author></div>
    <div class=article-comments></div>
</article>

<?php require("footer.html"); ?>
