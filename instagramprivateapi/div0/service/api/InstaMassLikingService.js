var InstaMassLikingService = function(app, eventEmitter){
    var _that = this;

    _that.request = null;
    _that.response = null;

    app.post('/massLike', function(req, res) {

        console.log("mass liking request");
        _that.request = req;
        _that.response = res;

        var collection = req.body.data;
        console.log("collection :",collection);

        eventEmitter.emit("onMassLikingRequest", {collection:collection});
    });

    this.sendCompleteResponse=function(data){
        _that.response.setHeader('Content-Type', 'application/json');
        _that.response.send({ result: 'massLikeComplete', accountId:data});
    };
    this.sendAccountCompleteResponse=function(data){
        _that.response.setHeader('Content-Type', 'application/json');
        _that.response.send({ result: 'accountMassLikeComplete', accountId:data});
    };
    this.sendErrorResponse = function(error){
        _that.response.setHeader('Content-Type', 'application/json');
        _that.response.send({ result: 'accountMassLikeError',error:error});
    };
};
module.exports.InstaMassLikingService = InstaMassLikingService;

