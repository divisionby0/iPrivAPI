var DetectMediaAlreadyHasLike = function(session, eventEmitter, media){
    var _that = this;
    _that.session = session;
    _that.currentMedia = media;

    media.likers(function(session, mediaId){
        
    });

    /*
    this.selectNextAccount = function(){
        _that.accountCounter+=1;
        _that.currentAccount = _that.collection[_that.accountCounter];
        console.log("Liking account "+_that.accountCounter+" / "+_that.collection.length);

        _that.selectedAccountName = "https://instagram/"+_that.currentAccount;

        _that.feed = client.Account.searchForUser(session, _that.currentAccount).then(function(account){
            console.log("account selected");
            var accountId = account._params.id;
            console.log("ID=",accountId);

            _that.createMediaFeed(accountId);
        }).catch(function(error){
            console.error("Account "+_that.selectedAccountName+" NOT FOUND ",error);
            _that.onAccountComplete();
        });
    };

    this.createMediaFeed = function(accountId){
        _that.mediaFeed = new client.Feed.UserMedia(session, accountId);

        _that.mediaFeed.get().then(function(results){
            _that.mediaCollection = results;
            _that.totalMedia = results.length;
            console.log("account " +_that.selectedAccountName+" totalMedia:",_that.totalMedia);

            if(_that.totalMedia>0){
                _that.currentMedia = _that.mediaCollection[_that.mediaCounter];



                _that.createLikeOnMedia();
            }
            else{
                console.log("Account "+_that.selectedAccountName+" has no media");

                var timeoutInterval = _that.createInterval();
                console.log("waiting "+Math.round(timeoutInterval)+" ms...");
                setTimeout(_that.onAccountComplete, Math.round(timeoutInterval));
            }
        });
    };


    this.createLikeOnMedia = function(){
        var mediaId =  _that.currentMedia._params.id;
        var mediaUrl =  _that.currentMedia._params.webLink;

        console.log("Account "+_that.selectedAccountName+" creating LIKE on media "+mediaId+"  url="+mediaUrl);

        new client.Request(session)
            .setMethod('POST')
            .setResource('like', {id: mediaId})
            .generateUUID()
            .setData({
                media_id: mediaId,
                src: "profile"
            })
            .signPayload()
            .send()
            .then(function(data) {
                console.log("Account "+_that.selectedAccountName+" like media "+mediaUrl+" complete");
                _that.waitAfterLikeOperation();
            })
            .catch(function(error){
                console.error("Account "+_that.selectedAccountName+" like media "+mediaUrl+" ERROR: ",error);
                _that.waitAfterLikeOperation();
            })
    };

    this.waitAfterLikeOperation = function(){
        var timeoutInterval = _that.createInterval();
        console.log("waiting "+Math.round(timeoutInterval)+" ms...");
        setTimeout(_that.onLikeMediaComplete, Math.round(timeoutInterval));
    };

    this.onLikeMediaComplete = function(){
        _that.mediaCounter++;

        var accountHasNextMedia = _that.mediaCounter<_that.totalMedia;

        if(accountHasNextMedia){
            _that.currentMedia = _that.mediaCollection[_that.mediaCounter];
            console.log(_that.mediaCounter+" / "+_that.totalMedia);
            _that.createLikeOnMedia();
        }
        else{
            console.log("!!! Like media for account "+_that.selectedAccountName+" TASK COMPLETE");

            var timeoutInterval = _that.createInterval();
            console.log("waiting "+Math.round(timeoutInterval)+" ms...");
            setTimeout(_that.onAccountComplete, timeoutInterval);
        }
    };

    this.onAccountComplete = function(){
        console.log("onAccountComplete "+_that.selectedAccountName);

        //eventEmitter.emit("onAccountMassLikingOperationComplete", _that.currentAccount);

        _that.resetMediaCounters();
        _that.nextAccount();
    };

    this.nextAccount = function(){
        var hasNextAccount = _that.hasNextAccount();
        console.log("hasNextAccount="+hasNextAccount);
        if(hasNextAccount){
            _that.selectNextAccount();
        }
        else{
            console.log("Accounts COMPLETE");
            _that.onTaskComplete();
        }
    };

    this.onTaskComplete = function(){
        eventEmitter.emit("onAccountMassLikingTaskComplete", null);
    };

    this.hasNextAccount = function(){
        var nextAccountIndex = _that.accountCounter + 1;
        if(nextAccountIndex < _that.totalAccounts){
            return true;
        }
        else{
            return false;
        }
    };

    this.resetMediaCounters = function(){
        _that.mediaCounter = 0;
        _that.currentMedia = null;
    };

    this.destroy = function(){
        console.log("MassLikingTask.destroy()");
    };

    this.createInterval = function(){
        var msToWait = Math.round(Math.random()*_that.minutesToWait*60*1000);
        return msToWait;
    };

    var timeoutInterval = _that.createInterval();
    console.log("waiting "+Math.round(timeoutInterval)+" ms...");
    setTimeout( _that.selectNextAccount, timeoutInterval);
    */
};
module.exports.DetectMediaAlreadyHasLike = DetectMediaAlreadyHasLike;
