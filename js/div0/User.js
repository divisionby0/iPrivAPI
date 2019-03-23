var User = (function () {
    function User(username, image, description, isFollowingMe) {
        if (isFollowingMe === void 0) { isFollowingMe = false; }
        this._isFollowingMe = false;
        this.username = username;
        this.image = image;
        this.description = description;
        this._isFollowingMe = isFollowingMe;
    }
    User.prototype.isFollowingMe = function () {
        return this._isFollowingMe;
    };
    User.prototype.setIsFollowingMe = function (value) {
        this._isFollowingMe = value;
    };
    User.prototype.getUsername = function () {
        return this.username;
    };
    User.prototype.getImage = function () {
        return this.image;
    };
    User.prototype.getDescription = function () {
        return this.description;
    };
    User.prototype.getUrl = function () {
        return "https://instagram.com/" + this.username + "/";
    };
    return User;
}());
//# sourceMappingURL=User.js.map