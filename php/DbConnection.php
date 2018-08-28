<?php

class DbConnection
{
    private $servername = "localhost";
    private $username = "root";
    private $password = "kljh76RRenJh7";

    private $isConnected = false;
    private $connection;

    public function __construct()
    {
        $this->createConnection();
    }

    public function isConnected(){
        return $this->isConnected;
    }
    public function getConnection(){
        return $this->connection;
    }
    
    private function createConnection(){
       $this->connection = new mysqli($this->servername, $this->username, $this->password, "instalikefollow");
        if ($this->connection->connect_error) {
            die("Connection failed: " . $this->connection->connect_error);
        }
        else{
            $this->isConnected = true;
            //echo "Connected successfully";
        }
    }
}