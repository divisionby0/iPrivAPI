var Accounts = function(){
    var _that = this;
    var map = require("../../div0/lib/collections/Map");
    var mapIterator = require("../../div0/lib/collections/MapIterator");

    var collection = new map.Map("accounts");

    this.add = function(name, value){
        collection.add(name, value);
    };
    this.get = function(name){
        return collection.get(name);
    };
    this.has = function(name){
        return collection.has(name);
    };
    this.size = function(){
        return collection.size();
    };
    this.getIterator = function(){
        return collection.getIterator();
    };
    this.checkIsMyFollower = function(name){
        //console.log("checkIsMyFollower name="+name);
        if(collection.has(name)){
            var account = collection.get(name);
            return account.getIsMyFollower();
        }
        else{
            return 0;
        }
    };
};
module.exports.Accounts = Accounts;