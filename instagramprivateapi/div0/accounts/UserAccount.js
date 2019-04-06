var UserAccount = function(name, image, description, isMyFollower, imFollowing){
    var _that = this;
    this.name = name;
    this.image = image;
    this.description = description;
    this.isMyFollower = isMyFollower;
    this.imFollowing = imFollowing;
    
    this.getName = function(){
        return _that.name;
    };
    this.getImage = function(){
        return _that.image;
    };
    this.getDescription = function(){
        return _that.description;
    };
    this.getIsMyFollower = function(){
        return _that.isMyFollower;
    };
    this.setIsMyFollower = function(value){
        _that.isMyFollower = value;
    };
    this.getImFollowing = function(){
        return _that.imFollowing;
    };
    this.setImFollowing = function(value){
        _that.imFollowing = value;
    };
};
module.exports.UserAccount = UserAccount;
