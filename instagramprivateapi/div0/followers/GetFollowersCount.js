var GetFollowersCount = function(client, session, eventEmitter, accountId, accountName){

    var _that = this;
    _that.total = 0;
    _that.feedLength = 0;
    _that.accountId = accountId;
    _that.accountName = accountName;

    _that.feed = new client.Feed.AccountFollowers(session, accountId);

    this.next = function(){
        _that.feed.get().then(function(results){
            _that.total+=results.length;
            _that.feedLength+=_that.total;
            console.log("account "+_that.accountName+" feedLength now:"+_that.feedLength+" counting on ....");
            var hasNext = _that.feed.isMoreAvailable();
            if(hasNext){
                //console.log("wait for next ...");
                setTimeout(_that.next, 2000);
                //_that.next();
            }
            else{
                //console.log("Total account "+_that.accountId+" followers: "+_that.total);
                eventEmitter.emit("onFollowersCountComplete", {accountId:_that.accountId, total:_that.total});
            }
        }).catch(function(error){
            console.error("AccountFollowers iterate ERROR: ",error);
            eventEmitter.emit("onFollowersCountError", {accountId:_that.accountId, total:-1});
        });
    };
    _that.next();
};

module.exports.GetFollowersCount = GetFollowersCount;
