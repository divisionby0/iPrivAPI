var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="FollowerListRenderer.ts"/>
///<reference path="FollowingListRenderer.ts"/>
var FollowingAccountListRenderer = (function (_super) {
    __extends(FollowingAccountListRenderer, _super);
    function FollowingAccountListRenderer() {
        _super.apply(this, arguments);
    }
    FollowingAccountListRenderer.prototype.createNameElement = function () {
        var color = "red";
        if (this.data.isFollowingMe() == true) {
            color = "green";
        }
        return this.j("<div class='col-md-4 followerListRendererText small'><a href='" + this.data.getUrl() + "' target='_blank' >" + this.data.getUsername() + "  <span style='color: " + color + ";'><b>" + this.data.isFollowingMe() + "</b></span>" + "</a></div>");
    };
    return FollowingAccountListRenderer;
}(FollowerListRenderer));
//# sourceMappingURL=FollowingAccountListRenderer.js.map