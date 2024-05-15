<?php
require 'token.php';
// read body
$prompt = file_get_contents('php://input');

$curl = curl_init("https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct");
curl_setopt($curl, CURLOPT_POST, 1);
$prompt = $_POST["prompt"];
$payload =
    '{
     "inputs": "Generate an newspaper article without the title, only the body and nothing else about: ' . $prompt . '",
     "parameters": {
      "max_new_tokens": 200,
      "return_full_text": false
     }}';

//echo json_encode($payload);
curl_setopt($curl, CURLOPT_POSTFIELDS, $payload);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$header = [
    'Content-Type: application/json',
    "Authorization: Bearer $token"
];
curl_setopt($curl, CURLOPT_HTTPHEADER, $header);

$result = json_decode(curl_exec($curl));

exit($result[0]->generated_text);

curl_close($curl);
