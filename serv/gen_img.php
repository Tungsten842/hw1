<?php
require 'token.php';
// read body
$prompt = file_get_contents('php://input');

$curl = curl_init("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0");
curl_setopt($curl, CURLOPT_POST, 1);

$jreq = array(
    "inputs" => $prompt,
);
$payload = json_encode($jreq);

//echo json_encode($payload);
curl_setopt($curl, CURLOPT_POSTFIELDS, $payload);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$header = [
    'Content-Type: application/json',
    "Authorization: Bearer $token"
];
curl_setopt($curl, CURLOPT_HTTPHEADER, $header);

$image = curl_exec($curl);

//$response_data = json_decode($response);
//$image = $responseData['image']; // adjust the key as needed

echo base64_encode($image);

//curl_close($curl);
