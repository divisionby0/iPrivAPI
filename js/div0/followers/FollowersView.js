///<reference path="FollowerListRenderer.ts"/>
var FollowersView = (function () {
    function FollowersView(parentContainer, collection) {
        this.j = jQuery.noConflict();
        this.parentContainer = parentContainer;
        this.collection = collection;
        this.j("#totalSelfFollowersContainer").text("Total followers: " + collection.length);
        for (var i = 0; i < this.collection.length; i++) {
            new FollowerListRenderer(this.parentContainer, this.collection[i]);
        }
    }
    return FollowersView;
}());
//# sourceMappingURL=FollowersView.js.map