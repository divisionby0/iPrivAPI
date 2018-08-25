///<reference path="../../lib/events/EventBus.ts"/>
///<reference path="events/FollowerEvent.ts"/>
var FollowerListRenderer = (function () {
    function FollowerListRenderer(parentElement, data) {
        this.j = jQuery.noConflict();
        this.data = data;
        this.parentElement = parentElement;
        var name = data.name;
        var image = data.image;
        var description = data.description;
        this.element = this.j("<div class='row'></div>");
        var nameElement = this.j("<div class='col-md-4'><a href='https://www.instagram.com/" + name + "/' target='_blank'>" + name + "</a></div>");
        var imageElement = this.j("<div class='col-md-2'><img src='" + image + "' style='width: 100%;'></div>");
        var descriptionElement = this.j("<div class='col-md-4'>" + description + "</div>");
        nameElement.appendTo(this.element);
        imageElement.appendTo(this.element);
        descriptionElement.appendTo(this.element);
        this.createChildren();
        this.element.appendTo(parentElement);
        this.createListeners();
    }
    FollowerListRenderer.prototype.createChildren = function () {
        var addToLikeCollectionButtonContainer = this.j("<div class='col-md-2'></div>");
        this.addToLikeCollectionButton = this.j("<button id='addToLikeCollectionButton'>Like</button>");
        addToLikeCollectionButtonContainer.appendTo(this.element);
        this.addToLikeCollectionButton.appendTo(addToLikeCollectionButtonContainer);
    };
    FollowerListRenderer.prototype.createListeners = function () {
        var _this = this;
        this.addToLikeCollectionButton.click(function () { return _this.onAddToLikeCollectionButtonClicked(); });
    };
    FollowerListRenderer.prototype.onAddToLikeCollectionButtonClicked = function () {
        EventBus.dispatchEvent(FollowerEvent.ADD_TO_LIKE_COLLECTION, this.data);
    };
    FollowerListRenderer.prototype.destroy = function () {
    };
    return FollowerListRenderer;
}());
//# sourceMappingURL=FollowerListRenderer.js.map