///<reference path="../../lib/events/EventBus.ts"/>
///<reference path="events/FollowerEvent.ts"/>
///<reference path="../User.ts"/>
var FollowerListRenderer = (function () {
    function FollowerListRenderer(parentElement, user) {
        this.j = jQuery.noConflict();
        this.data = user;
        this.parentElement = parentElement;
        var name = user.getUsername();
        var image = user.getImage();
        var description = user.getDescription();
        var url = user.getUrl();
        this.element = this.j("<div class='row followerListRenderer'></div>");
        //var nameElement = this.j("<div class='col-md-4 followerListRendererText small'><a href='"+url+"' target='_blank' >"+name+"</a></div>");
        var nameElement = this.createNameElement(url);
        var imageElement = this.j("<div class='col-md-2'><img src='" + image + "' style='width: 100%;'></div>");
        var descriptionElement = this.j("<div class='col-md-4 small followerListRendererText'>" + description + "</div>");
        nameElement.appendTo(this.element);
        imageElement.appendTo(this.element);
        descriptionElement.appendTo(this.element);
        this.createChildren();
        this.element.appendTo(parentElement);
        this.createListeners();
    }
    FollowerListRenderer.prototype.createNameElement = function () {
        return this.j("<div class='col-md-4 followerListRendererText small'><a href='" + this.data.getUrl() + "' target='_blank' >" + this.data.getUsername() + "</a></div>");
    };
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