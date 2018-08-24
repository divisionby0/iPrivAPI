var currentSession;
var selfAccountId;
var currentSession;
var user = require('./user'); //TODO если писать просто user то нда будет искать в NPM
var execute = function(client, device, storage, login, password, eventEmitter) {

    console.log("authorizing "+login+" / "+password);

    client.Session.create(device, storage, login, password).then(function(session){
        currentSession = session;

        currentSession.getAccountId().then(function(data){
            selfAccountId = data;
            var currentUser = new user.User(selfAccountId);
            currentUser.setSession(currentSession);
            eventEmitter.emit("onSelfLoginComplete", currentUser);
        });
    }).catch(function(error){
        eventEmitter.emit("onSelfLoginError",error);
    });
};

var getSession = function(){
    return currentSession;
};

module.exports.execute = execute;
module.exports.getSession = getSession;