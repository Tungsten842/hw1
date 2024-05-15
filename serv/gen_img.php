<?php
require 'token.php';
// read body
$prompt = file_get_contents('php://input');

$curl = curl_init("https://api-inference.huggingface.co/models/Kvikontent/midjourney-v6");
curl_setopt($curl, CURLOPT_POST, 1);
$payload =
    '{
     "inputs": "' . $prompt . '",
     "parameters": {
     }}';

//echo json_encode($payload);
curl_setopt($curl, CURLOPT_POSTFIELDS, $payload);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$header = [
    'Content-Type: application/json',
    "Authorization: Bearer $token"
];
curl_setopt($curl, CURLOPT_HTTPHEADER, $header);

$image = curl_exec($curl);

curl_close($curl);

exit(base64_encode($image));
