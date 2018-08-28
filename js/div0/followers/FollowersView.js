///<reference path="FollowerListRenderer.ts"/>
///<reference path="../User.ts"/>
var FollowersView = (function () {
    function FollowersView(parentContainer, collection) {
        this.j = jQuery.noConflict();
        this.parentContainer = parentContainer;
        this.collection = collection;
        this.j("#totalSelfFollowersContainer").text("Total followers: " + collection.length);
        for (var i = 0; i < this.collection.length; i++) {
            this.createRenderer(this.parentContainer, this.collection[i]);
        }
    }
    FollowersView.prototype.createRenderer = function (parentContainer, data) {
        new FollowerListRenderer(parentContainer, data);
    };
    return FollowersView;
}());
//# sourceMappingURL=FollowersView.js.map