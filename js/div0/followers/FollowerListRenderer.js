var FollowerListRenderer = (function () {
    function FollowerListRenderer(parentElement, data) {
        this.j = jQuery.noConflict();
        var name = data.name;
        var image = data.image;
        var description = data.description;
        this.element = this.j("<div class='row'></div>");
        var nameElement = this.j("<div class='col-md-4'><a href='https://www.instagram.com/" + name + "/' target='_blank'>" + name + "</a></div>");
        var imageElement = this.j("<div class='col-md-2'><img src='" + image + "' style='width: 100%;'></div>");
        var descriptionElement = this.j("<div class='col-md-6'>" + description + "</div>");
        nameElement.appendTo(this.element);
        imageElement.appendTo(this.element);
        descriptionElement.appendTo(this.element);
        this.element.appendTo(parentElement);
    }
    return FollowerListRenderer;
}());
//# sourceMappingURL=FollowerListRenderer.js.map