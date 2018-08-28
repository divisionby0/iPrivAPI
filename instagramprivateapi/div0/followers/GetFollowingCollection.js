var GetFollowingCollection = function(client, session, eventEmitter, accountId, userSession){
    var _that = this;
    _that.client = client;
    _that.session = session;
    _that.userSession = userSession;
    _that.accountId = accountId;
    _that.counter = 0;
    _that.max = 0;
    _that.currentFollowerId = null;
    _that.currentFollowerName = null;
    _that.currentFollowerImage = null;
    _that.currentFollowerDescription = null;
    _that.getFollowersCount = null;

    _that.followingCollection = [];

    this.nextFeedPage = function(){
        console.log("nextFeedPage");

        _that.feed.get().then(function(results){

            for(var i=0; i<results.length; i++){
                var account = results[i];

                var accountIsPrivate = account._params.isPrivate;

                if(!accountIsPrivate){
                    var username = account._params.username;
                    var image = account._params.picture;
                    var description = account._params.fullName;

                    _that.followingCollection.push({name:username,image:image, description:description});
                }
            }

            console.log("feed page following added ");
            var hasNextFeedPage = _that.feed.isMoreAvailable();
            console.log("hasNextFeedPage="+hasNextFeedPage);

            if(hasNextFeedPage){
                _that.nextFeedPage();
            }
            else{
                eventEmitter.emit("onFollowingCollectionLoadComplete", {following:_that.followingCollection, userSession:_that.userSession});
                _that.destroy();
                _that = null
            }
        });
    };

    this.destroy = function(){
        _that.feed = null;
        _that.followingCollection = [];
        _that.followingCollection = null;
    };

    console.log("creating my following feed _that.accountId="+_that.accountId);
    _that.feed = new client.Feed.AccountFollowing(session, _that.accountId.toString());

    _that.nextFeedPage();
};

module.exports.GetFollowingCollection = GetFollowingCollection;
