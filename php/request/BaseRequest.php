<?php

class BaseRequest
{
    protected $connection;
    protected $data;
    protected $response;
    
    public function __construct($data)
    {
        $this->data = $data;
        $this->connection = new DbConnection();
        $this->response = new Response();
        
        if($this->connection->isConnected()){
            // connection success
            $this->execute();
        }
        else{
            // connection error
        }
    }
    
    protected function execute(){
        
    }
    public function getResponse(){
        return $this->response;
    }
}