<?php require("header.html"); ?>
<script src="generate.js" defer></script>

<form class=form-generate>
    <label for="fname">Prompt:</label><br>
    <input type="text" name="prompt" id="prompt_text"><br>
    <input type="submit" value="Submit">
</form>

<div>
    <div class=text-result></div>
    <div class=title-result></div>
    <img src="" alt="" class=img-result>
    <div class=comment-result></div>
    <button onclick="submit_article()">SUBMIT</button>
</div>

<?php require("footer.html"); ?>
