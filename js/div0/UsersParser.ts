///<reference path="User.ts"/>
class UsersParser{
    private collection:any[];
    private total:number = 0;
    constructor(collection:any[]){
        this.collection = collection;
        this.total = collection.length;
    }

    public parse():User[]{
        var parsedCollection:Array<User> = new Array();

        for(var i:number = 0; i < this.total; i++){
            var data:any = this.collection[i];
            var user:User = new User(data.name, data.image, data.description);
            parsedCollection.push(user);
        }
        
        return parsedCollection;
    }
}
