<?php

require("./dbconn.php");

//input
$json = trim(file_get_contents("php://input"));
$input = json_decode($json, true);
$input["id"] = filter_var($input["id"], FILTER_SANITIZE_NUMBER_INT);

if(isset($input["id"])) {
    $stmt= $pdo->prepare("SELECT * FROM items WHERE id = :identifier");
    $stmt->bindParam(":identifier", $input["id"], PDO::PARAM_INT);
	$stmt->execute();
    $output = $stmt->fetch(PDO::FETCH_ASSOC);
}

echo json_encode($output??["error" => true]);   //echo just the error if no items are found