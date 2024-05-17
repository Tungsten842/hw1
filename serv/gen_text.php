<?php
require 'token.php';
// read body
$input = file_get_contents('php://input');

$curl = curl_init("https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct");
curl_setopt($curl, CURLOPT_POST, 1);


$prompt = "<|begin_of_text|>" . "<|start_header_id|>user<|end_header_id|>" . $input . "<|start_header_id|>assistant<|end_header_id|>";

$jreq = array(
    "inputs" => $prompt,
    "parameters" => array(
        "max_new_tokens" => 2000,
        "return_full_text" => false
    )
);

$payload = json_encode($jreq);
curl_setopt($curl, CURLOPT_POSTFIELDS, $payload);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$header = [
    'Content-Type: application/json',
    "Authorization: Bearer $token"
];
curl_setopt($curl, CURLOPT_HTTPHEADER, $header);

$result = json_decode(curl_exec($curl));

curl_close($curl);

exit($result[0]->generated_text);
