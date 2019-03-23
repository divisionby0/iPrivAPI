///<reference path="div0/followers/FollowersView.ts"/>
///<reference path="div0/like/LikeRequestCollectionListView.ts"/>
///<reference path="div0/like/service/MassLikeService.ts"/>
///<reference path="div0/followers/SelfFollowingView.ts"/>
///<reference path="div0/UsersParser.ts"/>
///<reference path="lib/events/EventBus.ts"/>
///<reference path="div0/followers/events/FollowerEvent.ts"/>
var MyApplication = (function () {
    function MyApplication() {
        var _this = this;
        this.version = "0.0.3";
        this.server = "http://instagramprivateapi:3000";
        this.loginRoute = "/instaLogin";
        this.getFollowersRoute = "/getFollowers";
        this.accountId = 0;
        this.socketUrl = "http://instagramprivateapi:8080";
        this.manualMassLikeCollection = new Map("colection");
        this.j = jQuery.noConflict();
        console.log("Im Application ver=", this.version);
        this.j("#versionContainer").text(this.version);
        this.createSocketConnection();
        EventBus.addEventListener(FollowerEvent.ADD_TO_LIKE_COLLECTION, function (data) { return _this.onAddToLikeCollectionRequest(data); });
    }
    MyApplication.prototype.onAddToLikeCollectionRequest = function (user) {
        var name = user.getUsername();
        if (!this.manualMassLikeCollection.has(name)) {
            this.manualMassLikeCollection.add(name, name);
            var collection = new Array();
            var iterator = this.manualMassLikeCollection.getIterator();
            while (iterator.hasNext()) {
                name = iterator.next();
                collection.push(name);
            }
            var names = collection.join();
            this.j("#manualMassLikeInput").val(names);
        }
    };
    MyApplication.prototype.createSocketConnection = function () {
        var _this = this;
        this.socket = io(this.socketUrl);
        this.socket.on('connect', function () { return _this.onSockedConnected(); });
        this.socket.on('message', function (message) { return _this.onSockedMessage(message); });
        this.socket.on('event', function (data) { return _this.onSockedEvent(data); });
        this.socket.on('disconnect', function () { return _this.onSockedDisconnected(); });
    };
    MyApplication.prototype.startApp = function () {
        var _this = this;
        this.massLikeService = new MassLikeService(this.server);
        var loginButton = this.j("#instaLoginButton");
        loginButton.click(function () { return _this.onLoginButtonClicked(); });
        EventBus.addEventListener(LikeEvent.MASS_LIKE_REQUEST, function (data) { return _this.onMassLikeRequest(data); });
    };
    MyApplication.prototype.parseSocketMessage = function (message) {
        //console.log("parsing message ",message);
        var response = message.response;
        switch (response) {
            case "loginError":
                var errorText = message.data.message;
                this.onInstaLoginError(errorText);
                break;
            case "loginComplete":
                this.onLoginComplete(message);
                break;
            case "onFollowingAccountsLoadComplete":
                this.onFollowingAccountsLoadComplete(message);
                break;
        }
    };
    MyApplication.prototype.onLoginButtonClicked = function () {
        var loginInput = this.j("#userName");
        var passInput = this.j("#userPass");
        var login = loginInput.val();
        var pass = passInput.val();
        this.socket.send({ 'message': { command: 'login', login: login, password: pass } });
    };
    MyApplication.prototype.onFollowingAccountsLoadComplete = function (data) {
        var parser = new UsersParser(data.data);
        this.followingCollection = parser.parse();
        this.updateRelations();
        new SelfFollowingView(this.j("#meFollowing"), this.followingCollection);
    };
    MyApplication.prototype.updateRelations = function () {
        var totalFollowingUsers = this.followingCollection.length;
        var totalFollowers = this.followersCollection.length;
        var i;
        var j;
        for (i = 0; i < totalFollowingUsers; i++) {
            var followingUser = this.followingCollection[i];
            var followingUserName = followingUser.getUsername();
            var isFollowingMe = false;
            for (j = 0; j < totalFollowers; j++) {
                var follower = this.followersCollection[j];
                var followerName = follower.getUsername();
                if (followingUserName == followerName) {
                    isFollowingMe = true;
                    break;
                }
            }
            followingUser.setIsFollowingMe(isFollowingMe);
        }
    };
    MyApplication.prototype.showNotMyFollowers = function () {
    };
    MyApplication.prototype.onLoginComplete = function (message) {
        var _this = this;
        this.accountId = message.data;
        this.j("#selfNameContainer").html("<a target='_blank' href='https://instagram.com/" + message.name + "'>" + message.name + "</a>");
        this.j("#selfImageContainer").html("<img src='" + message.image + "'/>");
        alert("Login to insta complete. Self id=" + this.accountId);
        this.clearInstaLoginInputs();
        this.hideLoginContainer();
        var getFollowersButton = this.j("#getFollowersButton");
        getFollowersButton.show();
        getFollowersButton.click(function () { return _this.onGetSelfFollowersClicked(); });
        var getFollowingCollectionButton = this.j("#getFollowingCollectionButton");
        getFollowingCollectionButton.show();
        getFollowingCollectionButton.click(function () { return _this.onGetFollowingCollectionClicked(); });
    };
    MyApplication.prototype.onGetFollowingCollectionClicked = function () {
        this.socket.send({ 'message': { command: 'getFollowingCollection', id: this.accountId } });
    };
    MyApplication.prototype.onGetSelfFollowersClicked = function () {
        var _this = this;
        // console.log("onGetSelfFollowersClicked this.accountId="+this.accountId);
        this.j.ajax({
            type: "POST",
            url: this.server + this.getFollowersRoute,
            data: { accountId: this.accountId },
            success: function (response) { return _this.onGetFollowersResponse(response); },
            error: function (error) { return _this.onGetFollowersError(error); },
            dataType: "json"
        });
    };
    MyApplication.prototype.onGetFollowersResponse = function (response) {
        //console.log("onGetFollowersResponse:",response);
        //this.myFollowersCollection = response.data;
        var parser = new UsersParser(response.data);
        this.followersCollection = parser.parse();
        new FollowersView(this.j("#selfFollowers"), this.followersCollection);
        new LikeRequestCollectionListView();
    };
    MyApplication.prototype.onGetFollowersError = function (error) {
        console.error("onGetFollowersError:", error);
    };
    MyApplication.prototype.onInstaLoginError = function (error) {
        console.error("login error:", error);
        this.clearInstaLoginInputs();
    };
    MyApplication.prototype.clearInstaLoginInputs = function () {
        this.j("userName").val("");
        this.j("userPass").val("");
    };
    MyApplication.prototype.hideLoginContainer = function () {
        this.j("#loginContainer").hide();
    };
    MyApplication.prototype.onMassLikeRequest = function (data) {
        this.massLikeService.createRequest(data);
    };
    MyApplication.prototype.onSockedConnected = function () {
        console.log("socket connected");
        this.startApp();
    };
    MyApplication.prototype.onSockedMessage = function (message) {
        //console.log("on message from server: ",message);
        this.parseSocketMessage(message);
    };
    MyApplication.prototype.onSockedEvent = function (data) {
        console.log("on event ", data);
    };
    MyApplication.prototype.onSockedDisconnected = function () {
        console.log("on disconnect");
    };
    return MyApplication;
}());
//# sourceMappingURL=MyApplication.js.map