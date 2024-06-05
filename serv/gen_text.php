<?php
require 'token.php';
// read body
header('Content-type: text/html; charset=utf-8');

$platform = "huggingface";
$streaming = true;

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
        "temperature" => $temperature,
        "stream" => $streaming
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
            "temperature" => $temperature,
            "max_new_tokens" => 500,
            "return_full_text" => false
        ),
        "options" => array(
            "use_cache" => false
        ),
        "stream" => $streaming,
    );
}
if ($platform == "groq") {
    $curl = curl_init("https://api.groq.com/openai/v1/chat/completions");
    $header = [
        'Content-Type: application/json',
        "Authorization: Bearer $token_gr"
    ];
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
    $jreq->stream = $streaming;
}

curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($jreq));
ob_implicit_flush(true);

/*
function no_text($j)
{
    if (property_exists($j->choices[0]->delta, 'content')) {
        echo $j->choices[0]->delta->content;
    } else {
        return true;
    }
}
*/
$counter = 0;
$buffer = "";
$parse_stream = function ($curl, $data) {
    echo $data;
    return strlen($data);

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

/*
$clean_output = function ($curl, $data) {
    $j = json_decode($data);
    if ($j == null) {
        return;
    }

    if (strcmp($j->event_type, "text-generation") == 0) {
        $s1 = str_replace("```json", "", $j->text);
        $s2 = str_replace("```", "", $s1);

        echo $j->text;
    }

    return strlen($data);
};
*/

function no_text($j)
{
    global $platform;
    if ($platform === "huggingface") {
        if (property_exists($j->token, 'text')) {
            $s1 = str_replace("<|eot_id|>", "", $j->token->text);
            /*
            $s1 = str_replace("```json", "", $j->token->text);
            $s2 = str_replace("```", "", $s1);
            */
            echo $s1;
        } else {
            return true;
        }
    }
}

function data_decode($data)
{
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
}

if ($streaming === true) {
    if ($platform == "huggingface") {
        $parse_stream = function ($curl, $data) {
            return data_decode($data);
        };
    }

    curl_setopt($curl, CURLOPT_WRITEFUNCTION, $parse_stream);
    curl_exec($curl);
} else {
    $raw_resp = curl_exec($curl);
    if ($platform === "groq") {
        $response_text = json_decode($raw_resp)->choices[0]->message->content;
        echo $response_text;
    }
    if ($platform === "cohere") {
        $j = json_decode($raw_resp)->text;
        $s1 = str_replace("```json", "", $j);
        $s2 = str_replace("```", "", $s1);
        echo $s2;
    }
    if ($platform === "huggingface") {
        echo json_decode($raw_resp)[0]->generated_text;
    }
}

$httpcode = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);

if ($httpcode != 200) {
    exit("Api error: " . $tmp);
}
curl_close($curl);
