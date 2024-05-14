<?php

// Create connection
$conn = mysqli_connect("localhost", "website", "", "website");
// Check connection
if (!$conn) {
    exit("Connection failed: " . mysqli_connect_error());
}

$query = "SELECT title,text,image FROM Articles ORDER BY date OFFSET 0 ROWS FETCH NEXT 100 ROWS ONLY";
$result = mysqli_query($conn, $query);
$rowcount = mysqli_num_rows($result);

for ($i = 0; $i < $rowcount; $i++) {
    $arr[$i] = mysqli_fetch_row($result);
}
exit(json_encode($arr));
