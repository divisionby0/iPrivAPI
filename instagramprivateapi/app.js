var version = "0.0.1";
var _scope = this;
var waitInterval = 0.6;

var instaLoginService;
_scope.instaGetFollowersService = null;
var selfUser;
_scope.getAccountFollowers = null;
_scope.getFollowingCollection = null;

var currentSession;
console.log(version);
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var _ = require('lodash');
var Promise = require('bluebird');
var cors = require('cors');

var getFollowers = require('./div0/followers/GetAccountFollowers');
var getFollowingCollection = require('./div0/followers/GetFollowingCollection');
var massLikingTask = require('./div0/like/MassLikingTask');

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

_scope.app.use(cors({origin: 'http://instagramprivateapi'}));

// create services
//instaLoginService = new loginService.InstaLoginService(_scope.app, eventEmitter);
_scope.instaGetFollowersService = new getFollowersService.InstaGetFollowersService(_scope.app, eventEmitter);
_scope.massLikeService = new _massLikeService.InstaMassLikingService(_scope.app, eventEmitter);


// TODO https://habr.com/post/127525/
var io = require('socket.io').listen(8080);

io.sockets.on('connection', function (socket) {
    console.log("on client connected id="+socket.id);

    socket.on('message', function (msg) {
        console.log("on message from client: ",msg);
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

    selfUser = data.currentUser;
    currentSession = loginUser.getSession();
    
    if(userSession){
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

this.onFollowingCollectionLoadComplete = function(data){
    console.log("onFollowingCollectionLoadComplete  data:",data);
    var userSession = data.userSession;
    if(userSession){
        userSession.send({response:"onFollowingAccountsLoadComplete", data:data.following, image:selfUser.getImage(), name:selfUser.getName(), fullname:selfUser.getFullName(), bio:selfUser.getBio()});
    }
};
this.onFollowersLoadComplete = function(data){
    var accountId = data.accountId;
    var accountFollowers = data.followers;

    _scope.instaGetFollowersService.sendCompleteResponse(accountFollowers);
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
};

this.onGetFollowingCollectionRequest = function(socket, accountId){
    console.log("onGetFollowingCollectionRequest()");
    _scope.getFollowingCollection = new getFollowingCollection.GetFollowingCollection(Client, currentSession, eventEmitter, accountId, socket);
};

this.onLoginRequest = function(data, socket){
    console.log("onLoginRequest()", data);
    
    if(currentSession){
        console.log("destroying current session to login by another user...");
        
        currentSession.destroy().then(function(response){
            console.log("relogin with data ",data.login, data.password);
            loginUser.execute(Client, device, storage, data.login, data.password, eventEmitter, socket);
        });
    }
    else{
        loginUser.execute(Client, device, storage, data.login, data.password, eventEmitter, socket);
    }
};

this.onGetFollowersRequest = function(data){
    console.log("onGetFollowersRequest data=",data);
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
    console.log("onFollowersCountComplete");
    var accountId = data.accountId;
    var total = data.total;
    console.log("onFollowersCountComplete accountId="+accountId+" total="+total);
};

_scope.createListeners();

module.exports = _scope.app;
