var version = "0.0.7";
var _scope = this;
var waitInterval = 0.88;
var isDebug = false;
var corsURL = "http://instagramprivateapi";

var instaLoginService;
_scope.instaGetFollowersService = null;
var selfUser;
_scope.getAccountFollowers = null;
_scope.getFollowingCollection = null;

var currentSession;
var port = 8080;
console.log(version," port:"+port);
console.log(version," waitInterval:"+waitInterval);
const log = require('simple-node-logger').createSimpleLogger('logs/project.log');
log.info(version," port:"+port);

const opts = {
    errorEventName:'error',
    logDirectory:'logs/rolling/', // NOTE: folder must exist and be writable...
    fileNamePattern:'roll-<DATE>.log',
    dateFormat:'YYYY.MM.DD'
};

const rollingLog = require('simple-node-logger').createRollingFileLogger( opts );

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var _ = require('lodash');
var Promise = require('bluebird');
var cors = require('cors');

require('./div0/lib/collections/MapIterator');
require('./div0/lib/collections/Map');
var getFollowers = require('./div0/followers/GetAccountFollowers');
var getFollowingCollection = require('./div0/followers/GetFollowingCollection');
var massLikingTask = require('./div0/like/MassLikingTask');
var db = require('./div0/service/LocalDataBase');
var accounts = require('./div0/accounts/Accounts');
_scope.userAccount = require('./div0/accounts/UserAccount');

console.log("db:",db);

var events = require('events');
var eventEmitter = new events.EventEmitter();

_scope.app = express();

var user = require('./div0/user/user');

// services
//var loginService = require('./div0/service/api/InstaLoginService');
var getFollowersService = require('./div0/service/api/InstaGetFollowersService');
var _massLikeService = require('./div0/service/api/InstaMassLikingService');

var loginUser = require('./div0/user/loginUser');

_scope.app.use(logger('dev'));
_scope.app.use(express.json());
_scope.app.use(express.urlencoded({ extended: false }));
_scope.app.use(cookieParser());
_scope.app.use(express.static(path.join(__dirname, 'public')));

_scope.app.use(cors({origin: corsURL}));

// create services
_scope.instaGetFollowersService = new getFollowersService.InstaGetFollowersService(_scope.app, eventEmitter);
_scope.massLikeService = new _massLikeService.InstaMassLikingService(_scope.app, eventEmitter);
_scope.db = new db.LocalDataBase(_scope.app, eventEmitter);
_scope.accounts = new accounts.Accounts();

console.log("accounts:",_scope.accounts);

// TODO https://habr.com/post/127525/
var io = require('socket.io').listen(port);

_scope.currentSocket = null;
_scope.currentInstaId = -1;
_scope.userSession = null;

io.sockets.on('connection', function (socket) {
    console.log("on client connected id="+socket.id);
    _scope.currentSocket = socket;
    socket.on('message', function (msg) {
        switch(msg.message.command){
            case "login":
                _scope.onLoginRequest(msg.message, socket);
                break;
            case "getFollowingCollection":
                _scope.onGetFollowingCollectionRequest(socket,msg.message.id);
                break;
        }
    });

    socket.on('disconnect', function() {
        console.log("client disconnected "+socket.id);
    });
});


// catch 404 and forward to error handler
_scope.app.use(function(req, res, next) {
  next(createError(404));
});

var Client = require('instagram-private-api').V1;
var device = new Client.Device('someuser2');
var storage = new Client.CookieMemoryStorage();

this.onSelfLoginComplete = function(data){
    console.log("onSelfLoginComplete");

    var userSession = data.userSession;
    _scope.userSession = userSession;

    selfUser = data.currentUser;
    currentSession = loginUser.getSession();
    _scope.userSession = currentSession;
    
    if(userSession){
        _scope.currentInstaId = selfUser.id;
        userSession.send({response:"loginComplete", data:selfUser.id, image:selfUser.getImage(), name:selfUser.getName(), fullname:selfUser.getFullName(), bio:selfUser.getBio()});
    }
};

this.onSelfLoginError = function(data){
    console.log("onSelfLoginError  data="+data);
    var userSession = data.userSession;
    
    if(userSession){
        console.log("sending to user login error...");
        userSession.send({response:"loginError", data:data.error});
    }
};
// accounts load
this.onFollowersLoadComplete = function(data){
    var accountId = data.accountId;
    var accountFollowers = data.followers;

   // console.log("FOLLOWERS:",JSON.stringify(accountFollowers));
    
    var i = 0;
    var totalFollowers = accountFollowers.length;
    for(i=0; i<totalFollowers; i++){
        var account = accountFollowers[i];
        var name = account.name;
        var description = account.description;
        var image = account.image;

        var userAccount = new _scope.userAccount.UserAccount(name, image, description, 1, 0);
        _scope.accounts.add(name, userAccount);
    }
    _scope.instaGetFollowersService.sendCompleteResponse(accountFollowers);
};

this.onFollowingCollectionLoadComplete = function(data){
    var userSession = data.userSession;

    console.log("FOLLOWING:",JSON.stringify(data.following));
    
    if(userSession){
        var i = 0;
        var totalFollowing= data.following.length;
        for(i=0; i<totalFollowing; i++){
            var account = data.following[i];
            var name = account.name;
            var description = account.description;
            var image = account.image;

            var accountExists = _scope.checkAccountExistence(account);
            
            if(!accountExists){
                var userAccount = new _scope.userAccount.UserAccount(name, image, description, 0, 1);
                _scope.accounts.add(name, userAccount);
            }
            else{
                var existingAccount = _scope.accounts.get(name);
                existingAccount.setImFollowing(1);
            }
        }
        userSession.send({response:"onFollowingAccountsLoadComplete", data:data.following, image:selfUser.getImage(), name:selfUser.getName(), fullname:selfUser.getFullName(), bio:selfUser.getBio()});
    }
    console.log("total accounts loaded ",_scope.accounts.size());
    var iterator = _scope.accounts.getIterator();
    
    while(iterator.hasNext()){
        var account = iterator.next();
        console.log("Account: name: "+account.getName()+" | "+account.getDescription()+" follower:"+account.getIsMyFollower()+" imFollowing:"+account.getImFollowing());
    }
};

this.onDBConnected = function(){
    console.log("onDBConnected isDebug=",isDebug);
    if(isDebug){
        console.log("adding debug data to DB...");
        _scope.db.addAccount("3","3","3",0,0);
    }
};
this.checkAccountExistence = function(account){
    return _scope.accounts.has(account.name);
};

this.createInterval = function(){
    return Math.round(Math.random()*10)*1000;
};

this.removeCollectionDuplicates = function(sourceArray){
    return sourceArray.filter( onlyUnique );
};
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

this.createListeners = function(){
    eventEmitter.on('onLoginRequest', _scope.onLoginRequest);
    eventEmitter.on('onGetFollowersRequest', _scope.onGetFollowersRequest);
    eventEmitter.on('onMassLikingRequest', _scope.onMassLikingRequest);
    eventEmitter.on('onAccountMassLikingOperationComplete', _scope.onAccountMassLikingOperationComplete);
    eventEmitter.on('onAccountMassLikingTaskComplete', _scope.onAccountMassLikingTaskComplete);

    eventEmitter.on('onSelfLoginComplete', _scope.onSelfLoginComplete);
    eventEmitter.on('onSelfLoginError', _scope.onSelfLoginError);

    eventEmitter.on("onFollowersLoadComplete", _scope.onFollowersLoadComplete);
    eventEmitter.on("onFollowingCollectionLoadComplete", _scope.onFollowingCollectionLoadComplete);
    eventEmitter.on("onDBConnected", _scope.onDBConnected);
};

this.onGetFollowingCollectionRequest = function(socket, accountId){
    _scope.getFollowingCollection = new getFollowingCollection.GetFollowingCollection(Client, currentSession, eventEmitter, accountId, socket);
};

this.onLoginRequest = function(data, socket){
    console.log("onLoginRequest");
    if(currentSession){
        console.log("destroying current session to login by another user...");
        
        currentSession.destroy().then(function(response){
            console.log("relogin with given data ");
            loginUser.execute(Client, device, storage, data.login, data.password, eventEmitter, socket);
        });
    }
    else{
        loginUser.execute(Client, device, storage, data.login, data.password, eventEmitter, socket);
    }
};

this.onGetFollowersRequest = function(data){
    _scope.getAccountFollowers = getFollowers.GetAccountFollowers(Client, currentSession, eventEmitter, data.accountId);
};

this.onMassLikingRequest = function(data){
    _scope.massLikeTask = massLikingTask.MassLikingTask(Client, currentSession, eventEmitter, data, waitInterval);
};
this.onAccountMassLikingOperationComplete = function(accountName){
    _scope.massLikeService.sendAccountCompleteResponse(accountName);
};
this.onAccountMassLikingTaskComplete = function(){
    _scope.massLikeService.sendCompleteResponse();
};

this.onFollowersCountComplete = function(data){
    //console.log("onFollowersCountComplete");
    var accountId = data.accountId;
    var total = data.total;
    //console.log("onFollowersCountComplete accountId="+accountId+" total="+total);
};

_scope.createListeners();

module.exports = _scope.app;
