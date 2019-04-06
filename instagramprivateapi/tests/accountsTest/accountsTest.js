var _scope = this;
var corsURL = "http://instagramprivateapi";
var express = require('express');
require('../../div0/lib/collections/MapIterator');
require('../../div0/lib/collections/Map');
var db = require('../../div0/service/LocalDataBase');
var accounts = require('../../div0/accounts/Accounts');
var cors = require('cors');
var events = require('events');
var fakeFollowersCollection = require('../../tests/accountsTest/FakeFollowersCollection');
var fakeFollowingCollection = require('../../tests/accountsTest/FakeFollowingCollection');
_scope.userAccount = require('../../div0/accounts/UserAccount');

var appDb = '../../tests/accountsTest/db/appDb.db';
_scope.app = express();
_scope.app.use(express.json());
_scope.app.use(express.urlencoded({ extended: false }));

_scope.app.use(cors({origin: corsURL}));

var eventEmitter = new events.EventEmitter();

_scope.db = new db.LocalDataBase(_scope.app, eventEmitter, appDb);
_scope.accounts = new accounts.Accounts();

var i = 0;

var _fakeFollowersCollection = new fakeFollowersCollection.FakeFollowersCollection();
var _fakeFollowingCollection = new fakeFollowingCollection.FakeFollowingCollection();

var followers = JSON.parse(_fakeFollowersCollection.getData());
var following = JSON.parse(_fakeFollowingCollection.getData());

var totalFollowers = followers.length;
var totalFollowing = following.length;
console.log("totalFollowers:"+totalFollowers);
console.log("totalFollowers:"+totalFollowers);

function loadFollowers(){
    for(i=0; i<totalFollowers; i++){
        var account = followers[i];
        
        var name = account.name;
        var description = account.description;
        var image = account.image;
        
        var userAccount = new _scope.userAccount.UserAccount(name, image, description, 1, 0);
        _scope.accounts.add(name, userAccount);
    }
}
function loadFollowing(){
    for(i=0; i<totalFollowing; i++){
        var account = following[i];
        var name = account.name;
        var description = account.description;
        var image = account.image;

        var accountExists = _scope.checkAccountExistence(account);

        if(!accountExists){
            var isMyFollower = _scope.checkIsMyFollower(name);
            var userAccount = new _scope.userAccount.UserAccount(name, image, description, isMyFollower, 1);
            _scope.accounts.add(name, userAccount);
        }
        else{
            var existingAccount = _scope.accounts.get(name);
            existingAccount.setImFollowing(1);
        }
    }
}

this.checkIsMyFollower = function(name){
    return _scope.accounts.checkIsMyFollower(name);
};
this.checkAccountExistence = function(account){
    return _scope.accounts.has(account.name);
};

this.set = function(value){
};

loadFollowers();
loadFollowing();

console.log("ready "+_scope.accounts.size());

var iterator = _scope.accounts.getIterator();
while(iterator.hasNext()){
    var account = iterator.next();
    console.log("ACCOUNT: "+account.getName()+" "+account.getIsMyFollower()+" "+account.getImFollowing());
 }