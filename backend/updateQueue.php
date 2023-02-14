<?php 
header("Access-Control-Allow-Origin: *");

header("Content-Type: application/json; charset=UTF-8");

header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");

header("Access-Control-Max-Age: 3600");

header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include("dbconfig.php");

mysqli_set_charset($link, 'utf8');

$sql = "SELECT 
        hn, 
        name,
        CONCAT(q_type,queue) AS queue
        FROM verify_xray
        WHERE 
	status = 3 AND
	DATE(date) = CURDATE() 
        ORDER BY queue ASC LIMIT 1";
    $result = mysqli_query($link, $sql);
    $data = array();
	$row = mysqli_fetch_assoc($result);
    if($row){
        
        
        $success = array(
            'status' => '200', 
            'message' => 'success',
            'data' => $row
        );
        echo json_encode($success);
    }else{
        $success = array(
            'status' => '200', 
            'message' => 'fail',
        );
        echo json_encode($success);
    }
    mysqli_close($link);


?>