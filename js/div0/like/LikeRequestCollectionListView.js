///<reference path="../../lib/events/EventBus.ts"/>
///<reference path="../followers/events/FollowerEvent.ts"/>
///<reference path="../followers/FollowerListRenderer.ts"/>
///<reference path="LikeListRenderer.ts"/>
///<reference path="../../lib/collections/Map.ts"/>
///<reference path="LikeEvent.ts"/>
var LikeRequestCollectionListView = (function () {
    function LikeRequestCollectionListView() {
        var _this = this;
        this.collection = new Map("colection");
        this.j = jQuery.noConflict();
        this.element = this.j("#addToLikeContainer");
        this.listContainer = this.j("#addToLikeCollectionContainer");
        this.headerElement = this.j("#addToLikeCollectionListHeader");
        this.createMassLikeRequestButton = this.j("#createMassLikeRequestButton");
        this.onCollectionChanged();
        this.element.show();
        this.createMassLikeRequestButton.click(function () { return _this.onCreateMassLikeButtonClicked(); });
        EventBus.addEventListener(FollowerEvent.ADD_TO_LIKE_COLLECTION, function (data) { return _this.onAddToLikeCollectionRequest(data); });
    }
    LikeRequestCollectionListView.prototype.onAddToLikeCollectionRequest = function (data) {
        var name = data.name;
        if (!this.collection.has(name)) {
            this.collection.add(data.name, data);
            new LikeListRenderer(this.listContainer, data);
            this.onCollectionChanged();
        }
    };
    LikeRequestCollectionListView.prototype.onCollectionChanged = function () {
        var size = this.collection.size();
        this.headerElement.text("Total to like: " + size);
        if (size > 0) {
            this.createMassLikeRequestButton.show();
        }
        else {
            this.createMassLikeRequestButton.hide();
        }
    };
    LikeRequestCollectionListView.prototype.onCreateMassLikeButtonClicked = function () {
        var data = this.buildData();
        console.log("onCreateMassLikeButtonClicked collection:", data);
        EventBus.dispatchEvent(LikeEvent.MASS_LIKE_REQUEST, data);
    };
    LikeRequestCollectionListView.prototype.buildData = function () {
        var data = [];
        var iterator = this.collection.getIterator();
        while (iterator.hasNext()) {
            var item = iterator.next();
            var name = item.name;
            data.push(name);
        }
        return data;
    };
    return LikeRequestCollectionListView;
}());
//# sourceMappingURL=LikeRequestCollectionListView.js.map