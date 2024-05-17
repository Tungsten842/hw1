<?php require("header.html"); ?>
<script src="generate.js" defer></script>

<form class=form-generate>
    <label for="fname">Prompt:</label><br>
    <input type="text" name="prompt" id="prompt_text"><br>
    <input type="submit" value="Submit">
</form>

<div>
    <div id=title-result></div>
    <div id=text-result></div>
    <div id=author-result></div>
    <img src="" alt="" id=image-result>
    <div id=comment-result></div>
    <div id=category-result></div>

    <button onclick="submit_article()">SUBMIT</button>
</div>

<?php require("footer.html"); ?>
