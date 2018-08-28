var User = (function () {
    function User(username, image, description) {
        this.username = username;
        this.image = image;
        this.description = description;
    }
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