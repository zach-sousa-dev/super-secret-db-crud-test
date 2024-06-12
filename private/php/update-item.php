<?php

require("./dbconn.php");

//input
$input = trim(file_get_contents("php://input"));
$input = json_decode($input, true);



try {

    //sanitize input and generate sql
    foreach($input as $key => $value) {
        $value = strip_tags($value);
        $value = htmlspecialchars($value);
        $key = strip_tags($key);
        $key = htmlspecialchars($key);

        $sql = "UPDATE items SET {$key}='{$value}' WHERE id={$input['id']}";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
    }

    $sql = "SELECT id FROM items ORDER BY id DESC LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $newId = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode(["error" => false, "id" => $newId["id"]]);
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode([
        "error" => true,
        "message" => $e, 
        "input" => $input,
        "sql" => $sql
    ]);
}
