var User = function(id){
    this.id = id;
    this.session;
    this.image;
    this.url;
    this.name;
    this.fullname;
    this.biography;

    var _that = this;
    _that.session = null;

    this.setSession = function(session){
        _that.session = session;
    };
    this.getSession = function(){
        return _that.session;
    };

    this.setImage = function(image){
        _that.image = image;
    };
    this.getImage = function(){
        return _that.image;
    };
    this.setName = function(name){
        _that.name = name;
    };
    this.getName = function(){
        return _that.name;
    };

    this.setFullName = function(name){
        _that.fullname = name;
    };
    this.getFullName = function(){
        return _that.fullname;
    };
    
    this.setBio = function(bio){
        _that.biography = bio;
    };
    this.getBio = function(){
        return _that.biography;
    };
};

module.exports.User = User;
