<?php

header("Access-Control-Allow-Origin: *");

header("Content-Type: application/json; charset=UTF-8");

header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");

header("Access-Control-Max-Age: 3600");

header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include("dbconfig.php");

mysqli_set_charset($link, 'utf8');
$requestMethod = $_SERVER["REQUEST_METHOD"];
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);
switch ($requestMethod) {
    case 'PUT':
        $sql_update = "UPDATE opd_queue_systems SET status = '" . $input['status'] ."' WHERE  id = '" . $input['id'] ."' ";
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
        $sql = "SELECT * FROM opd_queue_systems WHERE date = curdate() and status in (0,3)";
        $result = mysqli_query($link, $sql);
        $data = array();
        if ($result) {
            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }
            $success = array(
                'status' => '200',
                'message' => 'success',
                'data' => $data
            );
            echo json_encode($success);
        } else {
            $success = array(
                'status' => '200',
                'message' => 'fail',
                'data' => $data
            );
            echo json_encode($success);
        }
        mysqli_close($link);
        break;
}

// mysqli_close($link);
