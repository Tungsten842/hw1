<?php
require 'token.php';
// read body
$prompt = file_get_contents('php://input');

$curl = curl_init("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0");

$header = [
    'Content-Type: application/json',
    "Authorization: Bearer $token_hu"
];

$jreq = array(
    "inputs" => $prompt,
);
$payload = json_encode($jreq);

curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $payload);
curl_setopt($curl, CURLOPT_HTTPHEADER, $header);

$image = curl_exec($curl);

//$response_data = json_decode($response);
//$image = $responseData['image']; // adjust the key as needed

curl_close($curl);

exit(base64_encode($image));
