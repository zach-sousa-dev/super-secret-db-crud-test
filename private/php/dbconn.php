<?php
//basic connection to SQL
$host = "localhost";
$user = "root";
$password = "";
$dbname = "4ssolutions"; 

//set data source name
$dsn = "mysql:host=" . $host . ";dbname=" . $dbname;

//create a PDO instance
$pdo = new PDO($dsn, $user, $password);

$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


//disable strict mode
$stmt = $pdo->prepare("SET sql_mode = 'NO_ENGINE_SUBSTITUTION';");
$stmt->execute();