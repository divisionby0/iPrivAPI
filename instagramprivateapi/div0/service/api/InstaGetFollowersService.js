var InstaGetFollowersService = function(app, eventEmitter){
    var _that = this;

    _that.request = null;
    _that.response = null;

    app.post('/getFollowers', function(req, res) {
        _that.request = req;
        _that.response = res;

        var accountId = req.body.accountId;
        console.log("getFollowers accountId=",accountId);

        eventEmitter.emit("onGetFollowersRequest", {accountId:accountId});
    });

    this.sendCompleteResponse=function(data){
        _that.response.setHeader('Content-Type', 'application/json');
        _that.response.send({ result: 'getFollowersComplete', data:data});
    };
    this.sendErrorResponse = function(error){
        _that.response.setHeader('Content-Type', 'application/json');
        _that.response.send({ result: 'getFollowersError',error:error });
    };
};
module.exports.InstaGetFollowersService = InstaGetFollowersService;
