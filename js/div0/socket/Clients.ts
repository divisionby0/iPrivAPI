///<reference path="../../lib/collections/Map.ts"/>
///<reference path="Client.ts"/>
class Clients{
    private collection:Map<Client> = new Map<Client>("clients");

    constructor(connection:any){
        var id:string = connection.id;

        var client:Client = new Client(connection);
        this.collection.add(id, client);
    }
}
