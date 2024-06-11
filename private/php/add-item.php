<?php

require("./dbconn.php");

//input
$input = trim(file_get_contents("php://input"));
$input = json_decode($input, true);

//sanitize input and generate sql
$columns = "";
$values = "";
foreach($input as $key => $value) {
    $value = strip_tags($value);
    $value = htmlspecialchars($value);
    $key = strip_tags($key);
    $key = htmlspecialchars($key);

    if(empty($columns)) {
        $columns .= $key;
    } else {
        $columns .= (", ".$key);
    }

    if(empty($values)) {
        $values .= "'" . (empty($value) ? "NULL" : $value) . "'";
    } else {
        $values .= (", '" . (empty($value) ? "NULL" : $value) . "'");
    }
}
$sql = "INSERT INTO items (" . $columns . ") VALUES (" . $values . ");";

$stmt = $pdo->prepare($sql);
try {
    $stmt->execute();

    $sql = "SELECT id FROM items ORDER BY id DESC LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $newId = $stmt->fetch();
    echo json_encode(["error" => false, "id" => $newId]);
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode([
        "error" => true,
        "message" => $e, 
        "input" => $input,
        "sql" => $sql
    ]);
}
