var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="FollowersView.ts"/>
///<reference path="FollowingAccountListRenderer.ts"/>
var SelfFollowingView = (function (_super) {
    __extends(SelfFollowingView, _super);
    function SelfFollowingView() {
        _super.apply(this, arguments);
    }
    SelfFollowingView.prototype.createRenderer = function (parentContainer, data) {
        new FollowingAccountListRenderer(parentContainer, data);
    };
    SelfFollowingView.prototype.showCount = function () {
        this.j("#totalFollowingContainer").text("Following: " + this.collection.length);
    };
    return SelfFollowingView;
}(FollowersView));
//# sourceMappingURL=SelfFollowingView.js.map