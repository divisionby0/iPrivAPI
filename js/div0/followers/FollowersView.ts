///<reference path="FollowerListRenderer.ts"/>
///<reference path="../User.ts"/>
class FollowersView{
    protected parentContainer:any;
    protected collection:any[];
    protected j:any;

    constructor(parentContainer:any, collection:User[]){
        this.j = jQuery.noConflict();
        this.parentContainer = parentContainer;
        this.collection = collection;

        this.j("#totalSelfFollowersContainer").text("Total followers: "+collection.length);

        for(var i:number = 0; i<this.collection.length; i++){
            this.createRenderer(this.parentContainer, this.collection[i]);
        }
    }
    
    protected createRenderer(parentContainer:any, data:User):void{
        new FollowerListRenderer(parentContainer, data);
    }
}
