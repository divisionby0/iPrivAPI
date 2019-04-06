///<reference path="FollowerListRenderer.ts"/>
///<reference path="../User.ts"/>
var FollowersView = (function () {
    function FollowersView(parentContainer, collection) {
        this.j = jQuery.noConflict();
        this.parentContainer = parentContainer;
        this.collection = collection;
        this.showCount();
        for (var i = 0; i < this.collection.length; i++) {
            this.createRenderer(this.parentContainer, this.collection[i]);
        }
    }
    FollowersView.prototype.showCount = function () {
        this.j("#totalSelfFollowersContainer").text("Followers: " + this.collection.length);
    };
    FollowersView.prototype.createRenderer = function (parentContainer, data) {
        new FollowerListRenderer(parentContainer, data);
    };
    return FollowersView;
}());
//# sourceMappingURL=FollowersView.js.map