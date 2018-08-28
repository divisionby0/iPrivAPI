///<reference path="../../lib/collections/Map.ts"/>
///<reference path="Client.ts"/>
var Clients = (function () {
    function Clients(connection) {
        this.collection = new Map("clients");
        var id = connection.id;
        var client = new Client(connection);
        this.collection.add(id, client);
    }
    return Clients;
}());
//# sourceMappingURL=Clients.js.map