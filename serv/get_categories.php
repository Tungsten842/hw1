<?php

// Create connection
$conn = mysqli_connect("localhost", "website", "", "website");
// Check connection
if (!$conn) {
    exit("Connection failed: " . mysqli_connect_error());
}

$query = "
    SELECT c.name,c.id,COUNT(ac.category_id) as count
    FROM Categories c
    JOIN Articles_Categories ac ON c.id = ac.category_id
    GROUP BY c.name
    ORDER BY count DESC
    LIMIT 12";

$result = mysqli_query($conn, $query);
$rows_num = mysqli_num_rows($result);

$categories[] = array();
for ($i = 0; $i < $rows_num; ++$i) {
    $row = mysqli_fetch_assoc($result);
    $categories[$i] = new stdClass();
    $categories[$i]->name = $row["name"];
    $categories[$i]->id = $row["id"];
}

exit(json_encode($categories));
