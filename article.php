<?php
require("header.php");
?>
<link rel="stylesheet" href="/article.css">
<script src="/article.js" defer></script>

<article></article>
<div class=comment-section>
    <div class=article-comments></div>
    <?php if (isset($_SESSION["user_id"])) {; ?>
        <form id=comment-form>
            <p id=comment-error></p>
            <textarea name="comment" form="comment-form" placeholder="Insert a comment" id=user-comment-text></textarea>
            <input type="button" name="Post" value="Post" onclick="commment_prompt()">
        </form>
    <?php } ?>
</div>

<?php require("footer.html"); ?>
