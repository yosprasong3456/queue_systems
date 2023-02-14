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
        	// get Queue ----------------------------------------------------------------------------------------
            $sql_count_q = "SELECT count(queue_no) AS q FROM opd_queue_systems WHERE DATE(date) = '" . $now . "' AND queue_type = '" . $input['type'] . "' ";
            $result_q = mysqli_query($link, $sql_count_q);
            $q = mysqli_fetch_assoc($result_q);
            $sum_q = $q['q'] + 1;
            if($sum_q <= 9){
                $sum_q1 = $input['type']."00".$sum_q;
            }else if($sum_q <= 99){
                $sum_q1 = $input['type']."0".$sum_q;
            }else{
                $sum_q1 = $input['type'].$sum_q;
            }
            // end get Queue ------------------------------------------------------------------------------------

            $query_insert = "insert into opd_queue_systems (date, time, queue_no, status, queue_type, id) values 
            ('" . $now ."','" . $time ."','" . $sum_q1."','0','" . $input['type']."','" . $timestamp."' )";
            $result1 = mysqli_query($link, $query_insert);
            if($result1 != 0){
                $result1 = array('success'=>1);
                $success = array(
                    'status' => '200', 
                    'message' => 'success',
                    'data' => $sum_q1
                );
                echo json_encode($success);
            }else{
                $fail = array(
                    'status' => '400', 
                    'message' => 'fail',
                );
                echo json_encode($fail);
            }
        mysqli_close($link);
      break;
    case 'PUT':
        if($input['count']){
            $sql_update = "UPDATE opd_queue_systems SET status = '" . $input['status'] ."', count = '" . $input['count'] ."' WHERE  id = '" . $input['id'] ."' ";
        }else{
            $sql_update = "UPDATE opd_queue_systems SET status = '" . $input['status'] ."' WHERE  id = '" . $input['id'] ."' ";
        }
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
    $query_text = $_GET['room'];
    if($query_text){
        $sql = "SELECT 
        id,
        queue_no,
        status, 
        date,
        count,
        DATE_FORMAT(time, '%H:%i' ) AS check_in,
        queue_type
        FROM opd_queue_systems
        WHERE DATE(date) = '" . $now . "' AND queue_type = '" .$query_text."'
        ORDER BY time ASC";
    }else{
        $sql = "SELECT 
        queue_no,
        status, 
        date,
        count,
        DATE_FORMAT(time, '%H:%i' ) AS check_in,
        queue_type
        FROM opd_queue_systems
        WHERE DATE(date) = '" . $now . "' AND status = 0
        ORDER BY time ASC";
    }
    
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