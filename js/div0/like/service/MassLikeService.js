var MassLikeService = (function () {
    function MassLikeService(server) {
        this.route = "/massLike";
        this.j = jQuery.noConflict();
        this.server = server;
    }
    MassLikeService.prototype.createRequest = function (collection) {
        var _this = this;
        console.log("create request collection:", collection);
        this.j.ajax({
            type: "POST",
            url: this.server + this.route,
            data: { data: JSON.stringify(collection) },
            success: function (response) { return _this.onResponse(response); },
            error: function (error) { return _this.onError(error); },
            dataType: "json"
        });
    };
    MassLikeService.prototype.onResponse = function (response) {
        console.log("MassLikeService onResponse:", response);
    };
    MassLikeService.prototype.onError = function (error) {
        console.log("MassLikeService onError:", error);
    };
    return MassLikeService;
}());
//# sourceMappingURL=MassLikeService.js.map