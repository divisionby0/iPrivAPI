<?php

class CreateAccountRequest extends BaseRequest
{
    protected function execute(){
        $accountData = json_decode($this->data);

        $id = $accountData->id;

        $this->result = $id;

        $name = $accountData->name;
        $url = $accountData->url;
        $image = $accountData->image;

        $sql = "INSERT INTO accounts (id, name, url, image) VALUES (".$id.", '".$name."', '".$url."', '".$image."')";

        if ($this->connection->getConnection()->query($sql) === TRUE) {
            $this->response->setResult("complete");
        } else {
            $this->response->setResult("error");
            $this->response->setData($this->connection->getConnection()->error);
        }
    }
}