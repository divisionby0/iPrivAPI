var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="FollowerListRenderer.ts"/>
var FollowingListRenderer = (function (_super) {
    __extends(FollowingListRenderer, _super);
    function FollowingListRenderer() {
        _super.apply(this, arguments);
    }
    FollowingListRenderer.prototype.createNameElement = function () {
        return this.j("<div class='col-md-4 followerListRendererText small'><a href='" + this.data.getUrl() + "' target='_blank' >" + this.data.getUsername() + "  <span style='color: #1c7430;'><b>" + this.data.isFollowingMe() + "</b></span>" + "</a></div>");
    };
    return FollowingListRenderer;
}(FollowerListRenderer));
//# sourceMappingURL=FollowingListRenderer.js.map