<?php
// read body
$prompt = file_get_contents('php://input');

$curl = curl_init("https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct");
curl_setopt($curl, CURLOPT_POST, 1);
$prompt = "Lorenzo monaco a student gets arrested by unict universita di catania mafia";
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
curl_setopt($curl, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer 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'
]);

$result = json_decode(curl_exec($curl));

curl_close($curl);
exit($result[0]->generated_text);

