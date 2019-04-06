var LocalDataBase = function(app, eventEmitter, filePath){
    var _that = this;
    const sqlite3 = require('sqlite3').verbose();
    console.log("connecting...");
    var db = new sqlite3.Database(filePath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function(err) {
            if (err) {
                console.error("DB ERROR:",err);
            }
        eventEmitter.emit("onDBConnected",{});
    });
    
    db.on("error", function(error){
        console.log("DB ERROR:",error);
    });


    this.addAccount = function(name, img, description, isMyFollower, imFollowing){
        console.log("add account ",name);
        
        db.run("INSERT INTO accounts(name,isMyFollower,imFollowing,img,description) VALUES(?,?,?,?,?)", [name, isMyFollower, imFollowing, img, description], function(err) {
            if (err) {
                return console.log("INSERT ERROR",err);
            }
        });
        db.close();
    };
    this.updateImFollowing = function(name,imFollowing){
        db.run("UPDATE accounts SET imFollowing=? WHERE name=?", [imFollowing, name], function(err) {
            if (err) {
                return console.log("UPDATE ERROR",err);
            }
        });
        db.close();
    };
};
module.exports.LocalDataBase = LocalDataBase;

