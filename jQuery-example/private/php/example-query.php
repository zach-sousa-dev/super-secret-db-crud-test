<?php

require("dbconn.php");

//the following code was modified from Dave Slemon's example: 

//set data source name
$dsn = "mysql:host=".$host.";dbname=".$dbname;

//create a PDO instance
$pdo = new PDO($dsn, $user, $password);

//PDO Query
$stmt = $pdo->query("select * from employees");
echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));   //format the result in json before responding
