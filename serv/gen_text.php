<?php
require 'token.php';
// read body
header('Content-type: text/html; charset=utf-8');

$platform = "groq";

$json = json_decode(file_get_contents('php://input'));

if (property_exists($json, "temperature")) {
    $temperature = $json->temperature;
} else {
    $temperature = 0.1;
}

if ($platform == "cohere") {
    $curl = curl_init("https://api.cohere.com/v1/chat");
    $header = [
        'Content-Type: application/json',
        "Authorization: Bearer $token_co"
    ];
    $prompt = $json->message;
    $jreq = array(
        "model" => "command-r-plus",
        "message" => $prompt,
        "preamble" => $json->preamble,
        "temperature" => $temperature
    );
}
if ($platform == "huggingface") {
    $curl = curl_init("https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct");
    $header = [
        'Content-Type: application/json',
        "Authorization: Bearer $token_hu"
    ];
    $prompt =
        "<|begin_of_text|><|start_header_id|>system<|end_header_id|>"
        . $json->preamble .
        "<|eot_id|><|start_header_id|>user<|end_header_id|>"
        . $json->message .
        "<|eot_id|><|start_header_id|>assistant<|end_header_id|>";

    $jreq = array(
        "inputs" => $prompt,
        "parameters" => array(
            "max_new_tokens" => 500,
            "return_full_text" => false
        ),
        "options" => array(
            "use_cache" => false
        ),
        "stream" => true,
    );
}
if ($platform == "groq") {
    $curl = curl_init("https://api.groq.com/openai/v1/chat/completions");
    $header = [
        'Content-Type: application/json',
        "Authorization: Bearer $token_gr"
    ];

    $prompt =
        $json->preamble .
        $json->message;

    $jreq = new stdClass;
    $jreq->messages[] = array();
    $jreq->messages[0] = new stdClass;
    $jreq->messages[0]->role = "system";
    $jreq->messages[0]->content = "$json->preamble";
    $jreq->messages[1] = new stdClass;
    $jreq->messages[1]->role = "user";
    $jreq->messages[1]->content = "$json->message";
    $jreq->model = "llama3-70b-8192";
    $jreq->max_tokens = 1024;
    $jreq->stream = true;
}

$payload = json_encode($jreq);

curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
curl_setopt($curl, CURLOPT_POSTFIELDS, $payload);
ob_implicit_flush(true);

function no_text($j)
{
    if (property_exists($j->choices[0]->delta, 'content')) {
        echo $j->choices[0]->delta->content;
    } else {
        return true;
    }
}
$counter = 0;
$buffer = "";
$parse_stream = function ($curl, $data) {
    $single = explode('data:', $data);
    global $counter, $buffer;
    for ($i = 0; $i < count($single); $i++) {
        if (empty($single[$i])) {
            continue;
        }
        $j = json_decode($single[$i]);
        if ($j === null) {
            if ($counter == 1) {
                $buffer .= $single[$i];
                $nj = json_decode($buffer);
                if ($nj == null) {
                    continue;
                }
                if (no_text($nj)) {
                    continue;
                }
                $counter = 0;
            } else {
                $buffer .= $single[$i];
                $counter = 1;
            }
        } else {
            if (no_text($j)) {
                continue;
            }
        }
    }
    return strlen($data);
};

if ($platform == "huggingface") {
    $callback = function ($curl, $data) {
        $str = substr($data, 5);

        $clean_str = str_replace("<|eot_id|>", "", $str);
        print(json_decode($clean_str)->token->text);
        return strlen($data);
    };
}

curl_setopt($curl, CURLOPT_WRITEFUNCTION, $parse_stream);

$tmp = curl_exec($curl);

$httpcode = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
if ($httpcode != 200) {
    exit("Api error: " . $tmp);
}
curl_close($curl);
