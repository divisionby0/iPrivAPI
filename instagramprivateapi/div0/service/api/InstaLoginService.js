var InstaLoginService = function(app, eventEmitter){
    //this.app = app;
    var _that = this;

    _that.request = null;
    _that.response = null;

    app.post('/instaLogin', function(req, res) {

        _that.request = req;
        _that.response = res;

        //console.log("login:",req.body.login);
        //console.log("pass:",req.body.pass);

        eventEmitter.emit("onLoginRequest", {login:req.body.login, password:req.body.pass});
    });

    this.getResponse = function() {
        return _that.response;
    };
    this.sendCompleteResponse=function(data){
        _that.response.setHeader('Content-Type', 'application/json');
        _that.response.send({ result: 'loginComplete', accountId:data});
    };
    this.sendErrorResponse = function(error){
        _that.response.setHeader('Content-Type', 'application/json');
        _that.response.send({ result: 'loginError',error:error });
    };
};
module.exports.InstaLoginService = InstaLoginService;
