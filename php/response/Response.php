<?php


class Response
{
    private $result;
    private $data;
    
    public function __construct($result = null, $data = null)
    {
        if(isset($result)){
            $this->result = $result;
        }
        if(isset($data)){
            $this->data = $data;
        }
    }

    /**
     * @return mixed
     */
    public function getResult()
    {
        return $this->result;
    }

    /**
     * @return mixed
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * @param mixed $result
     */
    public function setResult($result)
    {
        $this->result = $result;
    }

    /**
     * @param mixed $data
     */
    public function setData($data)
    {
        $this->data = $data;
    }


}