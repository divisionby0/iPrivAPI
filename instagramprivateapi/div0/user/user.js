var User = function(id){
    this.id = id;
    this.session;

    var _that = this;
    _that.session = null;

    this.setSession = function(session){
        _that.session = session;
    };
    this.getSession = function(){
        return _that.session;
    };
};

module.exports.User = User;
