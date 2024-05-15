<?php
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
curl_setopt($curl, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer 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'
]);

$image = curl_exec($curl);

curl_close($curl);

exit(base64_encode($image));
