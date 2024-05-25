<?php
require 'token.php';
// read body
$input = file_get_contents('php://input');

$curl = curl_init("https://api.cohere.com/v1/chat");
#$curl = curl_init("https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct");

$header = [
    'Content-Type: application/json',
    "Authorization: Bearer $token_co"
];
/*
$header = [
    'Content-Type: application/json',
    "Authorization: Bearer $token_hu"
];
*/

#$prompt = "<|begin_of_text|>" . "<|start_header_id|>user<|end_header_id|>" . $input . "<|start_header_id|>assistant<|end_header_id|>";
$prompt = "$input";

$jreq = array(
    "model" => "command-r-plus",
    "message" => $prompt,
    "temperature" => 0.1,
);
/*
$jreq = array(
    "inputs" => $prompt,
    "parameters" => array(
        "max_new_tokens" => 2000,
        "return_full_text" => false
    )
);
*/

$payload = json_encode($jreq);

curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
curl_setopt($curl, CURLOPT_POSTFIELDS, $payload);

$tmp = curl_exec($curl);

$httpcode = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
if ($httpcode != 200) {
    exit("Api error: " + $tmp);
}
curl_close($curl);

$result = json_decode($tmp);
exit($result->text);
