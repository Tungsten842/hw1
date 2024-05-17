<?php
require 'token.php';
// read body
$input = file_get_contents('php://input');
$jin = json_decode($input);

// Create connection
$conn = mysqli_connect("localhost", "website", "", "website");
// Check connection
if (!$conn) {
    exit("Connection failed: " . mysqli_connect_error());
}

$title = mysqli_real_escape_string($conn, $jin->title);
$text = mysqli_real_escape_string($conn, $jin->text);
$image = mysqli_real_escape_string($conn, $jin->image);
$author = mysqli_real_escape_string($conn, $jin->author);
$now = date('Y-m-d H:i:s');

$query = "INSERT INTO Articles (title, text, image, author, date) VALUES
('$title','$text','$image','$author','$now')";
$result = mysqli_query($conn, $query);

$article_id = mysqli_insert_id($conn);

# Insert categories
print_r($jin->category);
$categories = json_decode($jin->category);
for ($i = 0; $i < count($categories); $i++) {
    //try {
    //} catch (mysqli_sql_exception) {}

    # Table Categories
    $cat = mysqli_real_escape_string($conn, $categories[$i]);
    $query = "INSERT INTO Categories (name) VALUES ('$cat')";
    mysqli_query($conn, $query);

    # Table Articles_Categories
    $category_id = mysqli_insert_id($conn);
    $query = "INSERT INTO Articles_Categories (article_id, category_id) VALUES
      ('$article_id','$category_id')";
    mysqli_query($conn, $query);
}

# Insert comments
print_r($jin->comments);
$comments = json_decode($jin->comments);
print_r($comments);
for ($i = 0; $i < count($comments); $i++) {
    $name = mysqli_real_escape_string($conn, $comments[$i]->name);
    $text = mysqli_real_escape_string($conn, $comments[$i]->text);

    $query = "INSERT INTO Comments (article_id,name,text)
      VALUES ('$article_id','$name','$text')";
    mysqli_query($conn, $query);
}
exit();
