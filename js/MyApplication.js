///<reference path="div0/followers/FollowersView.ts"/>
///<reference path="div0/like/LikeRequestCollectionListView.ts"/>
///<reference path="div0/like/service/MassLikeService.ts"/>
var MyApplication = (function () {
    function MyApplication() {
        var _this = this;
        this.server = "http://instagramprivateapi:3000";
        this.loginRoute = "/instaLogin";
        this.getFollowersRoute = "/getFollowers";
        this.accountId = 0;
        this.j = jQuery.noConflict();
        console.log("Im Application j=", this.j);
        this.massLikeService = new MassLikeService(this.server);
        var loginButton = this.j("#instaLoginButton");
        loginButton.click(function () { return _this.onLoginButtonClicked(); });
        EventBus.addEventListener(LikeEvent.MASS_LIKE_REQUEST, function (data) { return _this.onMassLikeRequest(data); });
    }
    MyApplication.prototype.onLoginButtonClicked = function () {
        var _this = this;
        var loginInput = this.j("#userName");
        var passInput = this.j("#userPass");
        var login = loginInput.val();
        var pass = passInput.val();
        this.j.ajax({
            type: "POST",
            url: this.server + this.loginRoute,
            data: { login: login, pass: pass },
            success: function (response) { return _this.onInstaLoginResponse(response); },
            error: function (error) { return _this.onInstaLoginError(error); },
            dataType: "json"
        });
    };
    MyApplication.prototype.onLoginComplete = function () {
        var _this = this;
        var getFollowersButton = this.j("#getFollowersButton");
        getFollowersButton.show();
        getFollowersButton.click(function () { return _this.onGetSelfFollowersClicked(); });
    };
    MyApplication.prototype.onGetSelfFollowersClicked = function () {
        var _this = this;
        console.log("onGetSelfFollowersClicked this.accountId=" + this.accountId);
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
        console.log("onGetFollowersResponse:", response);
        new FollowersView(this.j("#selfFollowers"), response.data);
        new LikeRequestCollectionListView();
    };
    MyApplication.prototype.onGetFollowersError = function (error) {
        console.error("onGetFollowersError:", error);
    };
    MyApplication.prototype.onInstaLoginResponse = function (response) {
        console.log("login response:", response);
        var result = response.result;
        if (result == "loginComplete") {
            this.accountId = response.accountId;
            alert("Login to insta complete. Self id=" + this.accountId);
            this.clearInstaLoginInputs();
            this.hideLoginContainer();
            this.onLoginComplete();
        }
        else {
            var errorText = response.error.message;
            this.clearInstaLoginInputs();
            alert(errorText);
        }
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
    return MyApplication;
}());
//# sourceMappingURL=MyApplication.js.map