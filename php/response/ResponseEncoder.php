<?php


class ResponseEncoder
{
    private $response;
    public function __construct($response)
    {
        $this->response = $response;
    }

    public function encode(){
        $data = new stdClass();
        $data->result = $this->response->getResult();
        $data->data = $this->response->getData();
        return json_encode($data);
    }
}