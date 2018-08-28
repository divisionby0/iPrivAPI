///<reference path="User.ts"/>
var UsersParser = (function () {
    function UsersParser(collection) {
        this.total = 0;
        this.collection = collection;
        this.total = collection.length;
    }
    UsersParser.prototype.parse = function () {
        var parsedCollection = new Array();
        for (var i = 0; i < this.total; i++) {
            var data = this.collection[i];
            var user = new User(data.name, data.image, data.description);
            parsedCollection.push(user);
        }
        return parsedCollection;
    };
    return UsersParser;
}());
//# sourceMappingURL=UsersParser.js.map