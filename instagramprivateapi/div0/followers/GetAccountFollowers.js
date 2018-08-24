var GetAccountFollowers = function(client, session, eventEmitter, accountId){
    var _that = this;
    _that.client = client;
    _that.session = session;
    _that.accountId = accountId;
    _that.counter = 0;
    _that.max = 0;
    _that.currentFollowerId = null;
    _that.currentFollowerName = null;
    _that.currentFollowerImage = null;
    _that.currentFollowerDescription = null;
    _that.getFollowersCount = null;

    _that.followers = [];

    this.nextFeedPage = function(){
        console.log("nextFeedPage");

        _that.feed.get().then(function(results){

            for(var i=0; i<results.length; i++){
                var followerAccount = results[i];

                var accountIsPrivate = followerAccount._params.isPrivate;

                if(!accountIsPrivate){
                    var followerUsername = followerAccount._params.username;
                    var image = followerAccount._params.picture;
                    var description = followerAccount._params.fullName;

                    _that.followers.push({name:followerUsername,image:image, description:description});
                }
            }

            console.log("feed page followers added ");
            var hasNextFeedPage = _that.feed.isMoreAvailable();
            console.log("hasNextFeedPage="+hasNextFeedPage);

            if(hasNextFeedPage){
                _that.nextFeedPage();
            }
            else{
                eventEmitter.emit("onFollowersLoadComplete", {accountId:_that.accountId, followers:_that.followers});
                _that.destroy();
                _that = null
            }
        });
    };

    this.destroy = function(){
        _that.feed = null;
        _that.followers = [];
        _that.followers = null;
    };

    _that.feed = new client.Feed.AccountFollowers(session, accountId);

    _that.nextFeedPage();
};

module.exports.GetAccountFollowers = GetAccountFollowers;
