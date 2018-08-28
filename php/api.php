<?php
include_once ("DbConnection.php");
include_once ("request/BaseRequest.php");
include_once ("request/CreateAccountRequest.php");
include_once ("response/Response.php");
include_once ("response/ResponseEncoder.php");

$request = null;
$method = null;
$data = null;

if(isset($_POST["method"])){

    $method = $_POST["method"];
    $data = $_POST["data"];

    switch($method){
        case "createAccount":
            $request = new CreateAccountRequest($data);
            $response = $request->getResponse();
            $responseEncoder = new ResponseEncoder($response);
            echo $responseEncoder->encode();
            break;
        default:
            echo "undefined method";
            break;
    }
}
else{
    echo "data did not post. data was:".$_POST["data"];
}






