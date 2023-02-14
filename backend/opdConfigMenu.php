<?php 
header("Access-Control-Allow-Origin: *");

header("Content-Type: application/json; charset=UTF-8");

header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");

header("Access-Control-Max-Age: 3600");

header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include("dbconfig.php");

mysqli_set_charset($link, 'utf8');


$requestMethod = $_SERVER["REQUEST_METHOD"];
$headers = apache_request_headers();    
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE); //convert JSON into array    // เธ•เธฃเธงเธเธชเธญเธเธซเธฒเธเนเธเน Method GET
date_default_timezone_set("Asia/Bangkok");
$today = date("Y-m-d H:i:s"); 
$time = date("H:i:s");
$now = date("Y-m-d");
$timestamp = date_create()->getTimestamp();
switch ($requestMethod) {
    case 'POST':
        $sql_update = "UPDATE opd_queue_config SET name = '" . $input['menu'] ."', color_btn = '" .$input['color']."' WHERE  id = '" . $input['id'] ."' ";
        $result = mysqli_query($link, $sql_update);
        if($link->affected_rows){
            $data = array(
                'status' => '200', 
                'message' => 'success'
            );
            echo json_encode($data);
        }else{
            $data = array(
                'status' => '200', 
                'message' => 'fail'
            );
            echo json_encode($data);
        }
        mysqli_close($link);
      break;
    case 'PUT':
        $sql_update = "UPDATE opd_queue_config SET inactive = '" . $input['inactive'] ."' WHERE  id = '" . $input['id'] ."' ";
        $result = mysqli_query($link, $sql_update);
        if($link->affected_rows){
            $data = array(
                'status' => '200', 
                'message' => 'success'
            );
            echo json_encode($data);
        }else{
            $data = array(
                'status' => '200', 
                'message' => 'fail'
            );
            echo json_encode($data);
        }
        mysqli_close($link);
      break;
    default:
    $sql = "SELECT id, name, inactive AS actived, color_btn FROM opd_queue_config";
    $result = mysqli_query($link, $sql);
    $data = array();
    if($result){
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        }
        $success = array(
            'status' => '200', 
            'message' => 'success',
            'data' => $data
        );
        echo json_encode($success);
    }else{
        $success = array(
            'status' => '200', 
            'message' => 'fail',
            'data' => $data
        );
        echo json_encode($success);
    }
    mysqli_close($link);
}

?>