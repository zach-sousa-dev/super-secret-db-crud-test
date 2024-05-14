<?php

//input
$json = trim(file_get_contents("php://input"));
$input = json_decode($json, true);
$input["qty"] = filter_var($input["qty"], FILTER_SANITIZE_NUMBER_INT);
$input["dir"] = strip_tags($input["dir"]);
$input["id"] = filter_var($input["id"], FILTER_SANITIZE_NUMBER_INT);

if($input["dir"] == "fwd") {
    $sql = "SELECT name, quantity, unit, available FROM items WHERE id > ? LIMIT ?";
} else {
    $sql = "SELECT name, quantity, unit, available FROM items WHERE id < ? LIMIT ?";
}


$firstId;       //the id of the first item
$lastId;        //the id of the last item
$output;        //the outputted array


if(isset($input["qty"])) {
    $stmt= $pdo->prepare($sql);
	$stmt->execute([$input["id"], $input["qty"]]);
	$result = $stmt->fetch();
    $count = 1;
    $arr;
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        if($count == 1) {
            $firstId = $result->id;
        } else if($count == $input["qty"]) {
            $lastId = $result->id;
        }
        array_push($arr, $row);
        $count++;
    }
    $output = ["firstId" => $firstId, "lastId" => $firstId, "items" => $arr];
}


echo json_encode($output??["error"=>"Error: no output :("]);