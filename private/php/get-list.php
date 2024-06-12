<?php

require("./dbconn.php");

/**
 * HOW TO USE
 * -Pass in a JSON w/ params "qty", "dir", "id"
 * -dir is whether you are pressing next or prev, values are "fwd" or "bwd"
 * -qty is the int amount of items to fetch
 * -id is the relevant id to search for items relative to, so if the last item on 
 * the previous page had an ID of 10 and I press next, I should only see items 
 * with ID greater than 10
 * 
 * This will probably suck to update when I implement filters :`)
 */

//input
$json = trim(file_get_contents("php://input"));
$input = json_decode($json, true);
$input["qty"] = filter_var($input["qty"], FILTER_SANITIZE_NUMBER_INT);
$input["dir"] = strip_tags($input["dir"]);
$input["id"] = filter_var($input["id"], FILTER_SANITIZE_NUMBER_INT);

if($input["dir"] == "fwd") {
    $sql = "SELECT * FROM items WHERE id > :identifier LIMIT :qty";     //used for going next
} else if($input["dir"] == "bwd") {
    $sql = "SELECT * FROM items WHERE id < :identifier ORDER BY id DESC LIMIT :qty";     //used for going back
} else {
    $sql = "SELECT * FROM items WHERE id >= :identifier LIMIT :qty";    //reloading
}


$firstId;       //the id of the first item
$lastId;        //the id of the last item
$output;        //the outputted array


if(isset($input["qty"])) {
    $stmt= $pdo->prepare($sql);
    $stmt->bindParam(":identifier", $input["id"], PDO::PARAM_INT);
    $stmt->bindParam(":qty", $input["qty"], PDO::PARAM_INT);
	$stmt->execute();

    $count = 0;     //to keep track of how many items have been iterated through
    $arr = [];      //array of items

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){  //for every row from the fetch
        array_push($arr, $row);
        $count++;
        if($count == 1) {
            $firstId = $row["id"];  //store the id of the first item
        }
        $lastId = $row["id"];       //update the last id for each item because it is possible that there are less available items than the qty
    }

    $sql = "SELECT COUNT(*) FROM items;";
    $stmt= $pdo->prepare($sql);
    $stmt->execute();
    $count = $stmt->fetch(PDO::FETCH_ASSOC)["COUNT(*)"];

    if ($input["dir"] == "bwd") {
        $arr = array_reverse($arr); // reverse the array if backwards
        $temp = $lastId;
        $lastId = $firstId;
        $firstId = $temp;
    }

    if(!empty($arr) && !(count($arr) < $input["qty"] && $input["dir"] == "bwd")) {
        $output = ["firstId" => $firstId, "lastId" => $lastId, "items" => $arr, "count" => $count,"error" => false];  //only build the output array if items are retrieved and if there are a sufficient number of items going backwards
    }
}

echo json_encode($output??["error" => true]);   //echo just the error if no items are found