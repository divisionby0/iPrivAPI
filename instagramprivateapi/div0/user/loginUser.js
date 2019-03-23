var currentSession;
var userSession;
var selfAccountId;
var currentSession;
var user = require('./user'); //TODO если писать просто user то нда будет искать в NPM
var execute = function(client, device, storage, login, password, eventEmitter, userSession) {

    var _that = this;
    _that.userSession = userSession;

    client.Session.create(device, storage, login, password).then(function(session){
        currentSession = session;
        
        currentSession.getAccount().then(function(data){
            //console.log("Account: ",data);

            selfAccountId = data._params.id;
            var currentUser = new user.User(selfAccountId);
            currentUser.setImage(data._params.profilePicUrl);
            currentUser.setName(data._params.username);
            currentUser.setFullName(data._params.fullname);
            currentUser.setBio(data._params.biography);
            currentUser.setSession(currentSession);
            eventEmitter.emit("onSelfLoginComplete", {currentUser:currentUser, userSession:_that.userSession});
        });
    }).catch(function(error){
        eventEmitter.emit("onSelfLoginError",{error:error, userSession:_that.userSession});
    });
};

var getSession = function(){
    return currentSession;
};

module.exports.execute = execute;
module.exports.getSession = getSession;