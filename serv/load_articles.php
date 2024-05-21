<?php
require 'token.php';
session_start();
if (!isset($_SESSION["admin"]) || $_SESSION["admin"] !== 1) {
    exit("Access denied");
}
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

    $cat = mysqli_real_escape_string($conn, $categories[$i]);
    $query = "SELECT id FROM Categories WHERE name = '$cat'";
    $result = mysqli_query($conn, $query);
    # Table Categories
    if ($result->num_rows == 0) {
        $query = "INSERT INTO Categories (name) VALUES ('$cat')";
        mysqli_query($conn, $query);
        $category_id = mysqli_insert_id($conn);
    } else {
        $row = mysqli_fetch_assoc($result);
        $category_id = $row["id"];
    }

    # Table Articles_Categories
    $query = "INSERT INTO Articles_Categories (article_id, category_id) VALUES
      ('$article_id','$category_id')";
    mysqli_query($conn, $query);
}

# Insert comments
$comments = json_decode($jin->comments);

for ($i = 0; $i < count($comments); $i++) {
    $name = mysqli_real_escape_string($conn, $comments[$i]->name);
    $text = mysqli_real_escape_string($conn, $comments[$i]->text);

    $query = "INSERT INTO Comments (article_id,name,text)
      VALUES ('$article_id','$name','$text')";
    mysqli_query($conn, $query);
}
exit();
