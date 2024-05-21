<?php
session_start();
$tmp = file_get_contents("php://input");
$input = json_decode($tmp);

// Create connection
$conn = mysqli_connect("localhost", "website", "", "website");
// Check connection
if (!$conn) {
    exit("Connection failed: " . mysqli_connect_error());
}

if (isset($input->id)) {
    $query = "SELECT title,text,image,author,id FROM Articles WHERE id = $input->id";
} else {
    $query = "SELECT title,text,image,author,id FROM Articles ORDER BY date DESC";
}
$articles_list = mysqli_query($conn, $query);
$articles_num = mysqli_num_rows($articles_list);

$raw_req = array();
for ($i = 0; $i < $articles_num; $i++) {

    $art_data = mysqli_fetch_assoc($articles_list);
    $article_id = $art_data["id"];

    # USER COMMENTS
    if (isset($_SESSION["id"])) {
        $user_id = $_SESSION["id"];
        $query = "SELECT Users.name,Comments.text FROM Comments JOIN Articles
         ON Comments.article_id = Articles.id
         JOIN Users ON Users.id = Comments.user_id
         WHERE Articles.id = $article_id AND Comments.name IS NULL
         AND user_id = $user_id";
        $result = mysqli_query($conn, $query);
        $user_comments_num = mysqli_num_rows($result);

        $comments[] = array();
        for ($j = 0; $j < $user_comments_num; ++$j) {
            $row = mysqli_fetch_assoc($result);
            $comments[$j] = new stdClass();
            $comments[$j]->name = $row["name"];
            $comments[$j]->text = $row["text"];
        }
    } else {
        $user_comments_num  = 0;
    }

    # GENERATED COMMENTS
    $query = "SELECT Comments.name,Comments.text FROM Comments JOIN Articles
         ON Comments.article_id = Articles.id
         WHERE Articles.id = $article_id AND Comments.user_id IS NULL";
    $result = mysqli_query($conn, $query);
    $row_num = mysqli_num_rows($result);

    # Append comments to comments
    for ($j = $user_comments_num; $j < $row_num + $user_comments_num; ++$j) {
        $row = mysqli_fetch_assoc($result);
        $comments[$j] = new stdClass();
        $comments[$j]->name = $row["name"];
        $comments[$j]->text = $row["text"];
    }

    #CATEGORIES 
    $query = "SELECT Categories.name FROM Categories
      JOIN Articles_Categories ON Categories.id = Articles_Categories.category_id
      JOIN Articles ON Articles_Categories.article_id = Articles.id
      WHERE Articles.id = '$article_id'";
    $result = mysqli_query($conn, $query);
    $row_num = mysqli_num_rows($result);

    $categories[] = array();
    for ($j = 0; $j < $row_num; ++$j) {
        $row = mysqli_fetch_row($result);
        $categories[$j] = $row[0];
    }


    $raw_req[$i] = array(
        "id" => $article_id,
        "title" => $art_data["title"],
        "text" => $art_data["text"],
        "image" => $art_data["image"],
        "author" => $art_data["author"],
        "comments" => $comments,
        "categories" => $categories
    );
}

exit(json_encode($raw_req));
